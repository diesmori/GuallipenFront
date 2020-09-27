import * as firebase from "firebase";

export function getHoy() {
  const d = new Date();
  var mm = d.getMonth() + 1; // getMonth() is zero-based
  var dd = d.getDate() - 4;

  return [
    d.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd
  ].join(",");
}

export function postPedidoATrans(pedido, transportista) {
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
export function postPedidoATrans2(pedido, transportista) {
  console.log(transportista);
  const id = pedido.id;
  firebase
    .database()
    .ref("/Transportistas/" + transportista.id + "/Ruta/Destinos/")
    .update({
      [id]: pedido
    });
}
