import "./App.css";
import app from "./firebase.init";
import { getAuth, signOut } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
function App() {
  const [user, setUser] = useState([]);
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setUser({});
      });
  };
  return (
    <div className="App">
      {user.email ? (
        <button onClick={handleSignOut}>Sign out</button>
      ) : (
        <button onClick={handleGoogleSignIn}>Google Sign in</button>
      )}

      <h2>Your Name : {user.displayName}</h2>
      <p>Your email address is : {user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
