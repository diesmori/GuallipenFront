import * as firebase from "firebase";

export function getHoy() {
  const d = new Date();
  var mm = d.getMonth() + 1; // getMonth() is zero-based
  var dd = d.getDate() - 1;

  return [
    d.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd
  ].join(",");
}
