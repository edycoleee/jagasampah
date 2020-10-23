import React, { useEffect, useState } from "react";
import app, { auth, LocalServer } from "../util/firebase";

export const AuthContext = React.createContext();
const db = app.firestore();
//setting jika menggunakan emulator firestore
if (LocalServer) {
  db.settings({ host: "localhost:8080", ssl: false });
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const [users, setUsers] = useState([]);
  //scroll context
  const [height, setHeight] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setHeight(window.pageYOffset);
    });
    return () => window.removeEventListener("scroll", () => {});
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        db.collection("CL_USER")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (!doc.exists) return;
            setUsers(doc.data());
          });
      }
      setPending(false);
    });
    return unsubscribe;
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  const contextState = {
    currentUser,
    users,
    setUsers,
    height,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={contextState}>
      {!pending && children}
    </AuthContext.Provider>
  );
};
