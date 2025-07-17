import {createApp} from 'vue'
import './style.css'
import {createPinia} from 'pinia'
import App from './App.vue'
import {initializeApp} from "firebase/app";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};
export const firebaseApp = initializeApp(firebaseConfig);

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.mount('#app')
