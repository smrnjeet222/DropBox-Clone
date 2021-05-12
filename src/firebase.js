import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MEASSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = firebase.initializeApp(firebaseConfig);
const fs = app.firestore();

export const db = {
    folders: fs.collection('folders'),
    files: fs.collection('files'),
    getTime: firebase.firestore.FieldValue.serverTimestamp,
    formatDoc: doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
    }
}

export const auth = app.auth();

export default app;