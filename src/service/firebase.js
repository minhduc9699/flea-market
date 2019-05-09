import firebase from 'firebase';
import { init } from "./fb";
import shortid from 'shortid';
import {getUnicodeText } from "../utils"
init()

const db = firebase.firestore();

firebase.storage().ref().constructor.prototype.putFiles = function (files) {
  var ref = this;
  return Promise.all(
    Object.values(files).map(function (file) {
      return ref
        .child(`${shortid.generate()}-${file.name}`)
        .put(file)
        .then((r) => r.ref.getDownloadURL());
    }),
  );
};

class FirebaseModel {
  constructor(collectionName) {
    this.collection = db.collection(collectionName)
  }

  async getAll() {
    const data = []
    await this.collection.get().then(query => {
      query.forEach(doc => {
        const snapshot = doc.data()
        snapshot._id = doc.id
        data.push(snapshot)
      });
    });
    return data
  }

  async getOne(_id) {
    let data;
    await this.collection.doc(_id).get().then(query => {
      data = { ...query.data(), _id: query.id }
    });
    return data
  }

  save(data) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.collection.doc().set(data);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
}


const model = {
  userProfile: new FirebaseModel("userProfiles"),
  product: new FirebaseModel("products"),
}


const signUp = async (lastName, firstName, phoneNumber, email, password) => {
  const r = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  firebase.auth().currentUser.sendEmailVerification();
  firebase.auth().currentUser.updateProfile({
    displayName: `${lastName} ${firstName}`,
    phoneNumber
  });
  model.userProfile.save({
    email,
    displayName: `${lastName} ${firstName}`,
    phoneNumber
  });
  localStorage.user = JSON.stringify(r.user);
  return r;
};


const uploadFile = async ({
  category,
  emotion,
  title,
  files,
  price,
  description,
  reason,
}) => {
  const ref = firebase.storage().ref();
  let imgUrls = [];
  if (files.length > 0) imgUrls = await ref.putFiles(files);
  const data = {
    category,
    emotion,
    title,
    price,
    description,
    reason,
    imgUrls,
    searchString: getUnicodeText(`${title} ${emotion} ${category}`),
    // userRef: firebase.auth().currentUser.uid,
    createdAt: new Date().toISOString(),
  };

  return model.product.save(data)
};

export default {
  signUp,
  uploadFile
}