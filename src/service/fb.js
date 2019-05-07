import firebase from "firebase";

var config = {
  apiKey: "AIzaSyBPYNsWiUMyahGHOQXNKGZYRAD8k1DGiNQ",
  authDomain: "camp-2019.firebaseapp.com",
  databaseURL: "https://camp-2019.firebaseio.com",
  projectId: "camp-2019",
  storageBucket: "camp-2019.appspot.com",
  messagingSenderId: "580757596336"
};

export const init = () => firebase.initializeApp(config);