import * as firebase from "firebase";

export function getHoy() {
  const d = new Date();
  var mm = d.getMonth() + 1; // getMonth() is zero-based
  var dd = d.getDate() - 3;

  return [
    d.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd
  ].join(",");
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
