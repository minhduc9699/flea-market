import firebase from 'firebase';
import { init } from "./fb"

init()

const db = firebase.firestore();

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

  async save(data) {
    await this.collection.doc().set(data)
    return data
  }
}


const model = {
  userProfile: new FirebaseModel("userProfiles"),
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



export default {
  signUp
}