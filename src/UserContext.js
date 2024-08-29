// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';


const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUser(userSnap.data());
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const [userOrders, setUserOrders] = useState([]);

useEffect(() => {
  const fetchOrders = async () => {
    const ordersRef = collection(db, 'orders');
    const ordersSnapshot = await getDocs(query(ordersRef, where('userId', '==', user.uid)));
    setUserOrders(ordersSnapshot.docs.map(doc => doc.data()));
  };
  fetchOrders();
}, [user]);

  return (
    <UserContext.Provider value={{ user, loading, userOrders }}>
    {children}
  </UserContext.Provider>
  );
};