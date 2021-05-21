import firebase from 'firebase';

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyAbR45lrzaZ33BtikqNBjtvnrHeWQaxiuk",
    authDomain: "fir-sample-6629a.firebaseapp.com",
    projectId: "fir-sample-6629a",
    storageBucket: "fir-sample-6629a.appspot.com",
    messagingSenderId: "639402109892",
    appId: "1:639402109892:web:6209c24a6c6eaaa3f01291"
  };

  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
export const getFirebaseItems = async () => {
  try {
    const snapshot = await db
      .collection("todos")
      .get();
    const items = snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id })
    );
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export const addFirebaseItem = async (item) => {
  try {
    const todoRef = db.collection("todos");
    await todoRef.add(item);
  } catch (err) {
    console.log(err);
  }
}

export const updateFirebaseItem = async (item, id) => {
  try {
    const todoRef = db.collection("todos").doc(id);
    await todoRef.update(item);
  } catch (err) {
    console.log(err);
  }
}

export const clearFirebaseItem = async (item) => {
  const todoRef = db.collection("todos").doc(item.id);
  await todoRef.delete().then(function () {
  }).catch(function (err) {
    console.log(err);
  });
};