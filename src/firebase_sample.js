import firebase from "firebase";
import { init } from "./service/fb";


init();

firebase.storage().ref().constructor.prototype.putFiles = function (files) {
  var ref = this;
  return Promise.all(Object.values(files).map(function (file) {
    return ref.child(file.name).put(file);
  }));
};

firebase.firestore.QuerySnapshot.prototype.first = function () {
  return this.docs[0];
};

const signUp = async () => {
  await firebase.auth().createUserWithEmailAndPassword(
    "qhuydtvt@gmail.com",
    "tradethecol@thanhcong"
  );
  firebase.auth().currentUser.sendEmailVerification();
};

const signIn = async () => {
  return await firebase.auth().signInWithEmailAndPassword(
    "qhuydtvt@gmail.com",
    "tradethecol@thanhcong"
  );
};

const main = async() => {
  await signIn();
  const db = firebase.firestore();
  const topicCollection = db.collection("topics");
  topicCollection.doc().set({
    title: "giới hạn dãy số",
    materials: [],
  });

  topicCollection.get().then(query => {
    query.forEach(doc => console.log(doc.data()));
  });
  
  // Search

  const snapshot = await topicCollection
    .where("title", "==", "Giới hạn của dãy số")
    .get();
}
  const id = snapshot.docs[0].id;
  
  const firstDoc = snapshot.first();
  console.log(firstDoc.data());

  // Update
  await topicCollection.doc(id).update({
    materials: firebase.firestore.FieldValue.arrayUnion({
      title: "Bài tập",
      content: "Câu 1 đến câu 4",
    })
  });
  
  // const topics = await topicCollection.get();
  // topics.forEach(topic => console.log(topic.data()));
  const uploadButton = document.getElementById("uploadFile");
  uploadButton.addEventListener("click", async () => {
    const ref = firebase.storage().ref();
    const files = await document.getElementById('photo').files;
    const snapshot = await ref.putFiles(files);
  });



main();

// signUp();

