import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBqUmYO3KznEJaSzfHkwh3ULX-LNoR8f1c",
  authDomain: "medical-dd248.firebaseapp.com",
  projectId: "medical-dd248",
  storageBucket: "medical-dd248.appspot.com",
  messagingSenderId: "518789872630",
  appId: "1:518789872630:web:26312948308685fde225d7",
  measurementId: "G-KK8QYSE6NS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to store user data
const storeUserData = async (user: User) => {
  await AsyncStorage.setItem('user', JSON.stringify(user));
};

// Function to load user data
const loadUserData = async () => {
  const userJson = await AsyncStorage.getItem('user');
  return userJson ? JSON.parse(userJson) : null;
};

// Auth State Change Listener
onAuthStateChanged(auth, async (user) => {
  if (user) {
    await storeUserData(user);
    console.log('User signed in');
  } else {
    console.log('User signed out');
    await AsyncStorage.removeItem('user');
  }
});

// Firestore functions for WebRTC
const fetchOfferFromFirebase = async (roomId: string) => {
  const roomRef = doc(db, 'rooms', roomId);
  const roomSnapshot = await getDoc(roomRef);
  return roomSnapshot.exists() ? roomSnapshot.data()?.offer : null;
};

const sendOfferToFirebase = async (offer: RTCSessionDescriptionInit, roomId: string) => {
  const roomRef = doc(db, 'rooms', roomId);
  await setDoc(roomRef, { offer: offer }, { merge: true });
};

const sendAnswerToFirebase = async (answer: RTCSessionDescriptionInit, roomId: string) => {
  const roomRef = doc(db, 'rooms', roomId);
  await updateDoc(roomRef, { answer: answer });
};

export { auth, db, fetchOfferFromFirebase, sendAnswerToFirebase, sendOfferToFirebase };
