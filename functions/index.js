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
