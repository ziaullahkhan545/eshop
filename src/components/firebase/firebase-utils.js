// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCC_7xuhRFQDmFDdZ2RninZa8TeYZTW-y8",
  authDomain: "ecommerce-52723.firebaseapp.com",
  projectId: "ecommerce-52723",
  storageBucket: "ecommerce-52723.appspot.com",
  messagingSenderId: "953586108661",
  appId: "1:953586108661:web:7232963df90964c3a1ddbc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// adding google authentication with firebase
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
const auth = getAuth();
export const LoginWithGoogle = () => (signInWithPopup(auth, provider));

// adding data to firestore 
const db =  getFirestore(app);
export const createUserProfileDoc = async (userAuthObj, additionalData) => {
  
  if(!userAuthObj) return;

  const querySnapShot = doc(db, `users/${userAuthObj.uid}`);
  const snapShotObj = await getDoc(querySnapShot);
  
  if (!snapShotObj.exists()) {
    
    const {displayName, email} = userAuthObj;
    const createdDate = new Date();

    try {
      await setDoc(doc(db, 'users', `${userAuthObj.uid}`), {
        displayName, email, createdDate, ...additionalData
      });
    } catch(error) {
      console.log(error, 'error occured');
    }

  };

  return querySnapShot;

}
