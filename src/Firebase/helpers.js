import * as firebase from "firebase";

export function getHoy() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [
    this.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd
  ].join(",");
}

export function getDailyPedidos(fecha) {
  var ref = firebase.database().ref("Ordenes/" + fecha);
  const ordenes = ref.on("value", function(snapshot) {
    const value = snapshot.val();
    console.log(value);
  });
}
