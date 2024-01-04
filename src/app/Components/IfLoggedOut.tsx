import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LoggedOutImg from "../public/assets/login__image.webp";
import {
  openLoginModal,
  closeLoginModal,
  openSignUpModal,
  closeSignUpModal,
} from "../redux/modalSlice";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

function IfLoggedOut() {
  const { isLoginModalOpen, isSignUpModalOpen } = useSelector(
    (state) => state.modals
  );
  const dispatch = useDispatch();

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

  return (
    <div className="ifLoggedOut__wrapper">
      {isLoginModalOpen && (
        <LoginModal
          isLoginModalOpen={isLoginModalOpen}
          closeLoginModal={handleCloseLogin}
          openSignUpModal={handleSignUp}
        />
      )}

      {isSignUpModalOpen && (
        <SignupModal
          isSignUpModalOpen={isSignUpModalOpen}
          closeSignUpModal={handleCloseSignUp}
          openLoginModal={handleLogin}
        />
      )}

      <Image src={LoggedOutImg} className="ifLoggedOut__img" alt="" />
      <h2 className="ifLoggedOut__text">
        Log in to your account to see your details.
      </h2>
      <button className="btn ifLoggedOut__btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default IfLoggedOut;
