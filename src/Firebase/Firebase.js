import firebase from "firebase";

class Firebase {
  constructor() {
    this.init();
    this.checkAuth();
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyDBAQpjnWfllyYS0Lta8kHXymz2Z43D95o",
        authDomain: "davis-graphics.firebaseapp.com",
        databaseURL: "https://davis-graphics.firebaseio.com",
        projectId: "davis-graphics",
        storageBucket: "davis-graphics.appspot.com",
        messagingSenderId: "621161385705",
        appId: "1:621161385705:web:8d9cbaa80e1ffa28666a78",
        measurementId: "G-PBXDV09YGJ"
      });
    }
  };

  checkAuth = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    });
  };
}
export default new Firebase();
