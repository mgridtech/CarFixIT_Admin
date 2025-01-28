import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBE6fAhJo-lQvWmY_dQRveoN1mULHhHO-Y",
  authDomain: "aczurex-d4b61.firebaseapp.com",
  databaseURL: "https://aczurex-d4b61-default-rtdb.firebaseio.com",
  projectId: "aczurex-d4b61",
  storageBucket: "aczurex-d4b61.appspot.com",
  messagingSenderId: "31992218561",
  appId: "1:31992218561:web:4a78b4751dfe5cf1562540",
  measurementId: "G-99S7QS47T7",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();
const nonAuth = firebase.auth;
const storage = firebase.storage();

const postDataWithRef = (collection, docRef, data) => {
  const value = database.ref(`/${collection}/${docRef}`).set({
    ...data,
  });
  return value;
};
const uploadTheImage = async (file) => {
  if (file) {
    let imageLink = "";
    const fileName = new Date().toString();
    const imageRef = await storage.ref(`files/${fileName}`);
    await imageRef.put(file).then(() => {
      imageLink = imageRef.getDownloadURL();
    });
    return imageLink;
  } else {
    return {};
  }
};
const checkIsUserExist = async (phone) => {
  let result = await database
    .ref("/user/")
    .orderByChild("phoneNumber")
    .equalTo(`${phone}`)
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        const userId = Object.keys(snapshot.val())[0];
        const data = Object.values(snapshot.val())[0];
        return { userId, ...data };
      } else {
        return null;
      }
    });
  return result;
};
const postData = (collection, data) => {
  const newReference = database.ref(`${collection}`).push();
  const value = newReference.set({
    ...data,
  });
  return value;
};

const getUserData = async (docRef) => {
  try {
    const snapshot = await firebase
      .database()
      .ref(`/user/${docRef}`)
      .once("value");
    const data = snapshot.val();

    if (data) {
      const userData = {
        name: data.name,
        email: data.userEmail,
        phoneNumber: data.phoneNumber,
        // Add any other fields you need from the user data
      };

      return userData;
    } else {
      console.error("User not found for id:", docRef);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

const getDataWithRef = async (collection, docRef) => {
  try {
    const snapshot = await database
      .ref(`/${collection}/${docRef}`)
      .once("value");
    const value = snapshot.val();
    return value;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const postUserDataWithId = async (id, data) => {
  const value = database.ref(`/user/${id}`).update({ ...data });
  return value;
};
const UpdateDataWithId = async (collection, id, data) => {
  const value = database.ref(`/${collection}/${id}`).update({ ...data });
  return value;
};

const discountreset = async (collection, fieldToUpdate, value) => {
  try {
    console.log(
      `Updating field '${fieldToUpdate}' with value '${value}' for all child nodes in collection: ${collection}`
    );
    const collectionRef = database.ref(`/${collection}`);

    const snapshot = await collectionRef.once("value");

    if (snapshot.exists()) {
      const updates = {};
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        updates[`${childKey}/${fieldToUpdate}`] = value;
      });

      // Apply all updates in one go
      await collectionRef.update(updates);
      console.log(
        `Field '${fieldToUpdate}' updated successfully with value '${value}' for all child nodes in collection: ${collection}`
      );
    } else {
      console.log("No data found in the specified collection.");
    }
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

const discountUpdate = async (collection, type, value) => {
  try {
    console.log("Processing collection:", collection, "Type:", type, "Value:", value);
    const collectionRef = database.ref(`/${collection}`);

    const snapshot = await collectionRef.once("value");

    if (snapshot.exists()) {
      const updatesBatch = []; // Array to store all updates
      const recordsPerBatch = 20; // Define how many records to update at a time

      // Process each child snapshot
      snapshot.forEach((childSnapshot) => {
        const childId = childSnapshot.key;
        const existingData = childSnapshot.val();
        let discountPrice;

        // Calculate the discountPrice based on the type
        if (type === "Percentage") {
          discountPrice = existingData.originalPrice * (1 - value / 100);
          discountPrice = parseFloat(discountPrice.toFixed(2));
        } else if (type === "Amount") {
          if (existingData.originalPrice < value) {
            discountPrice = existingData.originalPrice * 0.75;
          } else {
            discountPrice = existingData.originalPrice - value;
          }
          discountPrice = parseFloat(discountPrice.toFixed(2));
        } else {
          console.error("Invalid discount type:", type);
          return;
        }

        // Collect updates for this child node
        updatesBatch.push({ childId, discountPrice });
      });

      // Process updates in batches
      for (let i = 0; i < updatesBatch.length; i += recordsPerBatch) {
        const batch = updatesBatch.slice(i, i + recordsPerBatch); // Get the current batch
        const batchUpdates = {}; // Object to hold the updates for the current batch

        batch.forEach(({ childId, discountPrice }) => {
          // Update only the discountPrice field
          batchUpdates[`${childId}/discountPrice`] = discountPrice;
        });

        // Update the batch in Firebase
        await collectionRef.update(batchUpdates);
        console.log("Batch update complete for records:", batchUpdates);
      }

      console.log("All records updated in batches.");
    } else {
      console.log("No child nodes found in the collection.");
    }
  } catch (error) {
    console.error("Error updating data:", error);
  }
};


// const UpdateOrderWithId = async (id, data) => {
//   return await database.ref(`/orders/${id}`).update({ ...data });
// };
const getDataWholeCollection = async (collection) => {
  const value = await database
    .ref(`/${collection}`)
    .once("value", (onSnapshot) => {
      return onSnapshot.val();
    });
  let returnArr = [];

  value.forEach((childSnapshot) => {
    let item = childSnapshot.val();
    item.id = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};
const removeData = async (collection, docRef) => {
  return await database.ref(`/${collection}/${docRef}`).remove();
};
const getMYOrders = async (userid) => {
  let result = await database
    .ref("orders")
    .orderByChild("OrderedByUserId")
    .equalTo(`${userid}`)
    .once("value")
    .then((onSnapshot) => {
      return onSnapshot.val();
    });
  let returnArr = [];
  Object.entries(result).forEach((dat) => {
    returnArr.push({ id: dat[0], ...dat[1] });
  });
  return returnArr;
};
const getMYServicesReq = async (userid) => {
  let result = await database
    .ref("supportOrders")
    .orderByChild("OrderedByUserId")
    .equalTo(`${userid}`)
    .once("value")
    .then((onSnapshot) => {
      return onSnapshot.val();
    });
  let returnArr = [];
  Object.entries(result).forEach((dat) => {
    returnArr.push({ id: dat[0], ...dat[1] });
  });
  return returnArr;
};
export {
  database,
  nonAuth,
  auth,
  postDataWithRef,
  getDataWithRef,
  getDataWholeCollection,
  postData,
  removeData,
  checkIsUserExist,
  postUserDataWithId,
  getMYOrders,
  // UpdateOrderWithId,
  getMYServicesReq,
  uploadTheImage,
  UpdateDataWithId,
  getUserData,
  discountUpdate,
  discountreset,
};
