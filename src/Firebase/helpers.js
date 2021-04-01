import * as firebase from "firebase";

export function getHoy() {
  const d = new Date();
  var mm = d.getMonth() + 1; // getMonth() is zero-based
  var dd = d.getDate();

  return [
    d.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd
  ].join(",");
}

export async function getUbicacion() {
  var parseString = require("xml2js").parseString;
  const uri1 =
    "https://backend.gpsglobal.cl/api/ubicacion?v=SU0885,SU0890,ST0524,ST0463,ST1620&f=";
  const uri2 = "&api_token=b3e419cec0cbb806ad667efc79bd162f";
  const today = getHoy().replace(/,/g, "-");
  const uriFull = uri1 + today + uri2;
  //Fetch data
  let answer = {};
  await fetch(uriFull)
    .then(response => response.text())
    .then(data =>
      parseString(data, function(err, result) {
        //Formatear bien
        // console.log(result);
        result.markers.marker.map(function(marker, index) {
          answer[marker.$.id_auto] = marker.$;
        });
      })
    );
  return answer;
}

export function parseGeocerca(geocercas) {
  const split = geocercas.split("#");
  if (split.length === 1) return "Fuera";
  else return split[1];
}

export function signIn(user, pass) {
  firebase
    .auth()
    .signInWithEmailAndPassword(user, pass)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ...
    });
}

export function postPedidoATrans(pedido, transportista) {
  transportista.Ruta = null;
  firebase
    .database()
    .ref("/Ordenes/" + getHoy() + "/" + pedido.id)
    .update({
      Transportista: transportista
    });
}
export function deletePedidoATrans(pedido) {
  firebase
    .database()
    .ref("/Ordenes/" + getHoy() + "/" + pedido.id + "/Transportista")
    .remove();
}

export function postRuta(pedidos, transportista) {
  transportista.Ruta = null;
  firebase
    .database()
    .ref("/Rutas/" + getHoy())
    .push({
      Pedidos: pedidos,
      Transportista: transportista,
      Timestamp: Date.now()
    });
  firebase
    .database()
    .ref("/Transportistas/" + transportista.id + "/Ruta")
    .update({
      Pedidos: pedidos,
      Timestamp: Date.now()
    });
}
