import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, collection, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateEmail } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR-ViuYKvxtuCfPDZwq2DHsHby9B4NPC0",
  authDomain: "giggram-4aa20.firebaseapp.com",
  projectId: "giggram-4aa20",
  storageBucket: "giggram-4aa20.appspot.com",
  messagingSenderId: "299723601231",
  appId: "1:299723601231:web:039f135c8fc9ce541c813a",
  measurementId: "G-5865DYTVB9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage();

// Кэш данных пользователя
let cachedUserData = null;

// Функция для получения данных пользователя с кэшированием
export const getUserData = async (uid) => {
  if (cachedUserData) {
    return cachedUserData;
  }

  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      cachedUserData = userDoc.data();
      return cachedUserData;
    } else {
      console.error('No such user!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

// Функция для обновления данных пользователя
export const updateUserData = async (uid, userData) => {
  try {
    await setDoc(doc(db, 'users', uid), userData, { merge: true });
    cachedUserData = { ...cachedUserData, ...userData }; // Обновляем кэш
    console.log('User data updated successfully');
  } catch (error) {
    console.error('Error updating user data:', error);
  }
};

// Функция для загрузки аватара
export const uploadAvatar = async (file, uid) => {
  const avatarRef = ref(storage, `avatars/${uid}`);
  await uploadBytes(avatarRef, file);
  return await getDownloadURL(avatarRef);
};

// Функция для обновления email пользователя
export const updateUserEmail = async (newEmail) => {
  const user = auth.currentUser;

  if (user) {
    try {
      await updateEmail(user, newEmail);
      console.log('Email updated successfully');
    } catch (error) {
      throw new Error('Не удалось обновить email: ' + error.message);
    }
  } else {
    throw new Error('Пользователь не аутентифицирован');
  }
};

// Функция для проверки, существует ли имя пользователя в базе данных
export const checkUsernameExists = async (username) => {
  try {
    const q = query(collection(db, 'users'), where('username', '==', username));
    const querySnapshot = await getDocs(q);

    // Если есть хотя бы один документ с таким именем пользователя
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking username existence:', error);
    return false; // Возвращаем false при ошибке, чтобы не блокировать дальнейшие действия
  }
};

// Функция для проверки текущего пароля
export const verifyCurrentPassword = async (email, currentPassword) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, currentPassword);
    return !!userCredential.user; // Возвращаем true, если вход выполнен успешно
  } catch (error) {
    console.error('Error verifying current password:', error);
    return false;
  }
};

// Экспорт необходимых Firebase модулей
export { db, collection, auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, onSnapshot, signInWithPopup };
