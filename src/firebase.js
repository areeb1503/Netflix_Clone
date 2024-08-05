import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { addDoc, collection, getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword,signOut} from "firebase/auth";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyAehDTu6mD04u5cGamqmKqw4BGyQQcMB3w",
  authDomain: "netflix-clone-d5b85.firebaseapp.com",
  projectId: "netflix-clone-d5b85",
  storageBucket: "netflix-clone-d5b85.appspot.com",
  messagingSenderId: "1071158203509",
  appId: "1:1071158203509:web:6bbc8b1e9693459d24d43c"
};
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app)
const signup=async(name,email,password)=>{
    try {
        const res=await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        // const usersCollectionRef = collection(db, "users");

        await addDoc(collection(db, "user"), {
          uid: user.uid,
          name: user.displayName || "", // Handle potential null value for name
          authProvider: "local",
          email: user.email
        });
        
    } catch (error) {
      console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(" "))
      
    }

}
const login=async(email,password)=>{
  try {
    await signInWithEmailAndPassword(auth,email,password);
   
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split("-").join(" "))
  }
}
const logout=async()=>{
  signOut(auth);
}
export {auth,db,login,logout,signup}