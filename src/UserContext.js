import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth'; // Импорт функции для отслеживания изменений состояния аутентификации
import { auth, db, doc, onSnapshot } from './firebaseConfig'; // Импорт auth, db, doc и onSnapshot из firebaseConfig

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const unsubscribeSnapshot = onSnapshot(userDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            setUser(docSnapshot.data());
          } else {
            console.log("No such document!");
            setUser(null);
          }
        }, (error) => {
          console.error("Error fetching user data:", error);
        });

        // Очистка подписки при размонтировании компонента
        return () => unsubscribeSnapshot();
      } else {
        setUser(null);
      }
    });

    // Очистка подписки при размонтировании компонента
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
