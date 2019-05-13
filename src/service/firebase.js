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

  getAll() {
    const data = []
    this.collection.get().then(query => {
      query.forEach(doc => {
        const snapshot = doc.data()
        snapshot._id = doc.id
        data.push(snapshot)
      });
    });
    return data
  }

  async count(res) {
    const r = await res.get();
    return r.docs.length;
  }
  
  async paginate(query, pageNumber, perPage, populate="") {
    const data = [];
    const queryValue = [];
    let res = this.collection;

    for (let key in query) {
      res = res.orderBy(key);
      queryValue.push(query[key]);
    }

    if(queryValue.length > 0) {
      res = res
        .startAt(...queryValue)
        .endAt(...queryValue)
    }

    const total = await this.count(res)

    res = await res
      .limit(perPage*pageNumber)
      .get();

    let i = 0;
    res.forEach(doc => {
      if (i >= (pageNumber - 1) * perPage) {
        const snapshot = doc.data();
        snapshot._id = doc.id;
        data.push(snapshot);
      }
      i += 1;
    });
    if (populate) {
      for(let i=0; i < data.length; i++) {
        if (data[i].userRef) {
          const user = await data[i].userRef.get()
          data[i].userRef = user.data();
        }
      }
    }
    
    return {data, total}
  }

  async getOne(_id) {
    let data;
    await this.collection.doc(_id).get().then(query => {
      data = { ...query.data(), _id: query.id }
    });
    return data
  }

  getOneAndPopulate(_id, populatePath) {
    return new Promise(async (resolve, reject) => {
      let data = await this.getOne(_id);
      if(data.userRef) {
        const user = await data.userRef.get();
        data.userRef = user.data();
      }
      resolve(data);
      })
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

  saveWithId (_id, data) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.collection.doc(_id).set(data);
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

const checkAuth = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) resolve(user)
      else resolve(false);
    })  
  })

}

const signIn = async (email, password) => {
  return await firebase.auth().signInWithEmailAndPassword(
    email,
    password
  );
}

const signUp = async (fullName, email, password) => {
  const r = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  firebase.auth().currentUser.sendEmailVerification();
  firebase.auth().currentUser.updateProfile({
    displayName: fullName,
  });
  const user = await model.userProfile.saveWithId(firebase.auth().currentUser.uid ,{
    _id: r.user.uid,
    email,
    displayName: fullName,
  });
  localStorage.user = JSON.stringify(user);
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
    userRef: db.doc("userProfiles/" + firebase.auth().currentUser.uid),
    createdAt: new Date().toISOString(),
  };
  return model.product.save(data)
};


const paginate = async (query, page, perPage) => {
  return await model.product.paginate(query, page, perPage, true)
}

const showAll = async () => {
  return await model.product.getAll()
}

const getById = async (_id) => {
  return await model.product.getOneAndPopulate(_id, "userRef")
}


export default {
  checkAuth,
  signUp,
  signIn,
  uploadFile,
  paginate,
  showAll,
  getById
}