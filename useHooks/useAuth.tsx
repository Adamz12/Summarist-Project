import { setEmailLoginRef } from "@/app/redux/userSlice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  Auth,
  signInWithPopup,
} from "firebase/auth";
import { addDoc, collection, doc, Firestore, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import firebase, { auth, googleProvider } from "../firebase";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  closeLoginModal,
  closeSignUpModal,
  openLoginModal,
  openSignUpModal,
} from "@/app/redux/modalSlice";

export default function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { isLoginModalOpen, isSignUpModalOpen } = useSelector(
    (state) => state.modals
  );
  const currentPage = useSelector((state) => state.currentPage);

  const dispatch = useDispatch();

  const handleOpenLogin = () => {
    isLoginModalOpen(true);
  };

  const handleLogin = () => {
    dispatch(openLoginModal());
  };

  const handleCloseLogin = () => {
    dispatch(closeLoginModal());
  };

  const handleSignUp = () => {
    dispatch(openSignUpModal());
  };

  const handleCloseSignUp = () => {
    dispatch(closeSignUpModal());
  };

  const myCollection = collection(db, "users");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      console.log(user);
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  function registerEmailAndPassword(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        const userRef = doc(db, "users", user.uid);
        setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          subscriptionStatus: "basic",
        });

        if (user && userCredential) {
          dispatch(setEmailLoginRef(user.email));

          setTimeout(() => {
            dispatch(closeSignUpModal());
            router.push("/foryou");
          }, 2000);
        } else {
          handleLogin();
        }

        setUser(user);
        alert("Registration successful");
        router.push("/foryou");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function loginEmailAndPassword(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        if (user && userCredential) {
          dispatch(setEmailLoginRef(user.email));

          setTimeout(() => {
            dispatch(closeLoginModal());
            router.push("/foryou");
          }, 2000);
        }
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
        router.back();
      });
  }

  function handleGuestSignIn() {
    const email = "guest121212@gmail.com";
    const password = "Guest123!";

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Guest user signed in:", user);
        if (user && userCredential) {
          dispatch(setEmailLoginRef(user.email));
        }
      })
      .catch((error) => {
        console.error("Error signing in as a guest:", error);
      })
      .finally(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
          dispatch(setEmailLoginRef(currentUser.email));
        }
      });
  }

  function googleLogin() {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        router.push("/foryou");
      })
      .catch((error) => alert(error.message))
      .finally(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
          dispatch(setEmailLoginRef(currentUser.email));
        }
      });
  }

  function logout() {
    signOut(auth);
    setUser({});
    router.push("/foryou");
  }

  return {
    user,
    loading,
    registerEmailAndPassword,
    loginEmailAndPassword,
    handleGuestSignIn,
    googleLogin,
    logout,
  };
}
