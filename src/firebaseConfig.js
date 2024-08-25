import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, collection, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateEmail } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBR-ViuYKvxtuCfPDZwq2DHsHby9B4NPC0",
  authDomain: "giggram-4aa20.firebaseapp.com",
  projectId: "giggram-4aa20",
  storageBucket: "giggram-4aa20.appspot.com",
  messagingSenderId: "299723601231",
  appId: "1:299723601231:web:039f135c8fc9ce541c813a",
  measurementId: "G-5865DYTVB9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();

// Функция для получения данных пользователя
export const getUserData = async (uid) => {
  try {
    const userDoc = doc(db, 'users', uid); // Исправлено
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
      return userSnapshot.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Функция для обновления данных пользователя
export const updateUserData = async (userId, userData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, userData, { merge: true });
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

// Функция для загрузки аватара
export const uploadAvatar = async (file, userId) => {
  const storageRef = ref(storage, `avatars/${userId}/${file.name}`);
  try {
    // Загрузка файла
    await uploadBytes(storageRef, file);
    
    // Получение URL файла
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw error;
  }
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
export { db, collection, auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, onSnapshot, signInWithPopup, doc };