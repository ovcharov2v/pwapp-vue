import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBqS0Uj7IM4uk0-P8fuRGrECtWrnElANFE",
    authDomain: "vuetest-c4710.firebaseapp.com",
    databaseURL: "https://vuetest-c4710-default-rtdb.firebaseio.com",
    projectId: "vuetest-c4710",
    storageBucket: "vuetest-c4710.appspot.com",
    messagingSenderId: "1026993715118",
    appId: "1:1026993715118:web:5a153b6892ec1f45d27a3f",
    measurementId: "G-J3135FLQXB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export async function getUsers() {
    const usersCol = collection(db, 'users');
    const userSnapshot = await getDocs(usersCol);
    const userList = userSnapshot.docs.map(doc => doc.data());
    return userList;
}

export function login(email:string, password:string) {
 //
}

export const fbRegister = async function(name: string, email:string, password:string) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser!, { displayName: name });
    }
    catch (error) {
        return error.code;
    }
}




