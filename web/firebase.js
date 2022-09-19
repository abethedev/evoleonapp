import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  Auth,
  getAuth,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

//Firebase config for Evoleon Application
const firebaseConfig = {
  apiKey: "AIzaSyDKfzJfKg08xUAHb7WBhs-I2L8lQV5nUIg",
  authDomain: "evoleonapp.firebaseapp.com",
  projectId: "evoleonapp",
  storageBucket: "evoleonapp.appspot.com",
  messagingSenderId: "425564389277",
  appId: "1:425564389277:web:c86772f8abb19ffca47974",
  measurementId: "G-GL6LC3D645",
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const dbf = getFirestore();

//Boolean - true if user is signed in
var userIsAuthenticated;

export const getuserIsAuthenticated = () => {
  return userIsAuthenticated;
};

//Get the text for the sign in/sign out button in top left menu.
export var getSignInSignOutButtonText = () => {
  var text;
  if (userIsAuthenticated) {
    text = "Sign out";
  } else {
    text = "Sign in";
  }
  return text;
};

export const signInSignOutButtonPressed = () => {
  //If the user is signed in, then sign out the user.
  if (userIsAuthenticated) {
    userSignOut();
  }
};

//Firebase config for Evoleon Application
// const firebaseConfig = {
//   apiKey: "AIzaSyDKfzJfKg08xUAHb7WBhs-I2L8lQV5nUIg",
//   authDomain: "evoleonapp.firebaseapp.com",
//   projectId: "evoleonapp",
//   storageBucket: "evoleonapp.appspot.com",
//   messagingSenderId: "425564389277",
//   appId: "1:425564389277:web:c86772f8abb19ffca47974",
//   measurementId: "G-GL6LC3D645"
// };

//Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth();

//Sign in for an existing user
export const userSignIn = (email, password) => {
  const authInfo = auth;
  signInWithEmailAndPassword(authInfo, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Logged in with:", user.email);
      userIsAuthenticated = true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

//Sign up for a new user
export const userSignUp = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Created new account for:", user.email);
      userIsAuthenticated = true;
    })
    .catch((error) => {
      console.log(error.code);
    });
};

//Sign out of user account
export const userSignOut = () => {
  const authInfo = auth;
  auth
    .signOut()
    .then((userCredential) => {
      userIsAuthenticated = false;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

// =======================DATABASE CODE IGNORE FOR NOW====================== //

// Method for creating user and storing in DB
export const createUserDocFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { firstName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        firstName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error in creatinggg ", error.message);
    }
  }

  return userDocRef;
};

// export const createAuthUserWithEmailAndPassword = async (email, password) => {
//   if (!email || !password) return;
//   return await createUserWithEmailAndPassword(auth, email, password);
// };
