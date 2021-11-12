import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from
    "firebase/auth";

const authProvider = new GoogleAuthProvider();
const firebaseConfig = {
    apiKey: "AIzaSyBoeB2h_zyh7XfoAxzWc2vdPtdZbbsXfGg",
    authDomain: "writers-bloq.firebaseapp.com",
    projectId: "writers-bloq",
    storageBucket: "writers-bloq.appspot.com",
    messagingSenderId: "787276035958",
    appId: "1:787276035958:web:4e5896b72ca68fcecd6c57"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function signInWithGoogle(): void {
    signInWithPopup(auth, authProvider);
}
export function signOut(): void {
    auth.signOut();
}

