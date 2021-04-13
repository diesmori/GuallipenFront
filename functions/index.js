const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

// La fecha de hoy
function today() {
  var d = new Date();
  var curr_date = ("0" + d.getDate()).slice(-2);
  var curr_month = ("0" + (d.getMonth() + 1)).slice(-2); //Months are zero based
  var curr_year = d.getFullYear();
  var myDate = curr_year + "," + curr_month + "," + curr_date;
  return myDate;
}

// Estados de Pedidos
function estados(estado) {
  const hashEstados = { 520: "Ingresado", 540: "Liberado", 585: "Facturado" };
  return hashEstados[estado];
}

//Unix a fecha
function unixToDate(unix_timestamp) {
  var date = new Date(unix_timestamp * 1000);
  var hours = date.getHours() - 3;
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  return formattedTime;
}

async function getClientLatLon(id) {
  return new Promise(resolve => {
    admin
      .database()
      .ref("Clientes/" + id)
      .once("value", snapshot => {
        const results = snapshot.val();
        if ("Latitud" in results)
          resolve({ Latitud: results.Latitud, Longitud: results.Longitud });
        else resolve(null);
      });
  }).catch(err => {
    console.log(err);
    resolve(null);
  });
}

exports.presendEmail = functions.database
  .ref("Ordenes/{date}/{Id}")
  .onWrite((change, context) => {
    const hashEstados = { 520: "Ingresado", 540: "Liberado", 585: "Facturado" };
    const after = change.after.val(); // DataSnapshot after the change
    const pedido = context.params.Id;
    const nombreCliente = after.NombreCliente.replace(",", ".");
    const cuerpoMensaje =
      "El pedido " +
      pedido +
      " de " +
      nombreCliente +
      " ha sido " +
      estados(after.Estado.toString()) +
      " a las " +
      unixToDate(after.Timestamps[after.Estado.toString()]) +
      "\n\nAutogenerado por Guallipen 2.0 para Davis Graphics.";

    const asunto =
      estados(after.Estado.toString()) +
      ": " +
      nombreCliente +
      " y su pedido " +
      pedido;

    // Obtener email del vendedor que corresponde

    return admin
      .database()
      .ref("Clientes/" + after.Cliente + "/Vendedor/Email")
      .once("value", snapshot => {
        var sellerMail = snapshot.val();
        console.log(sellerMail);
        admin
          .firestore()
          .collection("mail")
          .add({
            to: sellerMail,
            message: { subject: asunto, text: cuerpoMensaje }
          });
      });
  });

exports.checkLatLon = functions.database
  .ref("Transportistas/{id}")
  .onWrite((change, context) => {
    const after = change.after.val(); // DataSnapshot after the change
    const idTransportista = context.params.id;
    // Obtener LatLon del transportista
    const currentLat = after.Latitud;
    const currentLon = after.Longitud;

    // Buscar por cada cliente de la ruta
    after.Ruta.Pedidos.map(async (pedido, index) => {
      if ("Cliente" in pedido) {
        console.log(pedido.Cliente);
        // Si el cliente tiene LatLon, cotejar con la del transportista
        const clientLatLon = await getClientLatLon(pedido.Cliente);
        if (clientLatLon !== null) {
          const clientLat = clientLatLon.Latitud;
          const clientLon = clientLatLon.Longitud;
          // Si está dentro del rango, postear con return para no seguir buscando
          const rangoLat = 0.002; // 220m
          const rangoLon = 0.003; // 270m
          console.log(Math.abs(currentLat - clientLat));
          console.log(Math.abs(currentLon - clientLon));
          if (Math.abs(currentLat - clientLat) < rangoLat) {
            if (Math.abs(currentLon - clientLon) < rangoLon) {
              // El transportista está dentro del rango del cliente. Retornar
              return admin
                .database()
                .ref(
                  "Transportistas/" + idTransportista + "/Ruta/Pedidos/" + index
                )
                .update({
                  haLlegado: true
                });
            }
          }
        }
      }
    });
    return true;
  });
