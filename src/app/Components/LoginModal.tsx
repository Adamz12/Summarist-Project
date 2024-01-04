"use client";
import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import useAuth from "../../../useHooks/useAuth";
import { useState, useRef } from "react";
import SignupModal from "./SignupModal";
import { useDispatch } from "react-redux";
import { changePage } from "../redux/pageSlice";
import { CgSpinner } from "react-icons/cg";
import { openLoginModal } from "../redux/modalSlice";

function LoginModal({ isLoginModalOpen, closeLoginModal, openSignUpModal }) {
  const { loginEmailAndPassword } = useAuth();
  const { googleLogin } = useAuth();
  const { handleGuestSignIn } = useAuth();
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const dispatch = useDispatch();
  const emaiLoginRef = useRef();
  const passwordLoginRef = useRef();

  const handleLoginEmailAndPassword = async (e: {
    preventDefault: () => void;
  }) => {
    e.preventDefault();

    const Loginemail = emaiLoginRef.current?.value;
    const Loginpassword = passwordLoginRef.current?.value;

    try {
      console.log("it works on loginmodal");
      loginEmailAndPassword(Loginemail, Loginpassword);
      setLoginLoading(true);

      setTimeout(() => {
        dispatch(changePage("ForYou"));
      }, 2000);
    } catch (error) {
      console.error("Login failed with error:", error);
    }
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    setTimeout(() => {
      googleLogin();
      closeLoginOnly();
      dispatch(changePage("ForYou"));
    }, 2000);
  };

  const handleLoginGuest = () => {
    setGuestLoading(true);
    setTimeout(() => {
      handleGuestSignIn();
      closeLoginOnly();
      dispatch(changePage("ForYou"));
    }, 2000);
  };

  const handleLogin = () => {
    dispatch(openLoginModal());
  };

  const closeLoginOnly = () => {
    if (isLoginModalOpen) {
      closeLoginModal();
    }
  };

  const openSignUpModalOnly = () => {
    closeLoginOnly();
    openSignUpModal();
  };

  return (
    <div>
      <Modal
        className={`modal ${isLoginModalOpen && !loginSuccess ? "" : "hidden"}`}
        open={isLoginModalOpen}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="modal__box" sx={{ height: 520, width: 420 }}>
          <button onClick={closeLoginModal}>
            <AiOutlineClose className="x-icon" />
          </button>
          <h2 className="modal-title">Log in to Summarist</h2>
          <div className="modal__content">
            <Link href="/foryou">
              <button
                className="btn__modal btn__guest"
                onClick={handleLoginGuest}
              >
                <BsFillPersonFill className="person__icon" />
                {guestLoading ? (
                  <figure className="spinner__wrapper">
                    <CgSpinner className="spinner__modal" />
                  </figure>
                ) : (
                  <h3 className="btn__title">Login as a Guest</h3>
                )}
              </button>
            </Link>
            <div className="seperator">
              <div className="border__line"></div>
              <div className="optional">or</div>
              <div className="border__line"></div>
            </div>
            <button
              className="btn__modal btn__google"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="google__icon" />
              {googleLoading ? (
                <figure className="spinner__wrapper">
                  <CgSpinner className="spinner__modal" />
                </figure>
              ) : (
                <h3 className="btn__title">Login with Google</h3>
              )}
            </button>
            <div className="seperator">
              <div className="border__line"></div>
              <div className="optional">or</div>
              <div className="border__line"></div>
            </div>

            <form
              className="login__container"
              onSubmit={handleLoginEmailAndPassword}
            >
              <label className="modal__login">
                <input
                  type="email"
                  placeholder="Email"
                  className="input"
                  ref={emaiLoginRef}
                />
              </label>
              <label className="modal__login">
                <input
                  type="password"
                  placeholder="Password"
                  className="input"
                  ref={passwordLoginRef}
                />
              </label>
              <button className="btn__modal btn__login" type="submit">
                {loginLoading ? (
                  <figure className="spinner__wrapper">
                    <CgSpinner className="spinner__modal" />
                  </figure>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
          <div className="modal__no-account">
            <div className="modal__forgot-password">Forgot Password?</div>
            <div className="border__seperator--flipped"></div>

            <div
              className="modal__create-account"
              onClick={openSignUpModalOnly}
            >
              Create an Account
            </div>
          </div>

          {isSignUpOpen && (
            <SignupModal
              isSignUpModalOpen={isSignUpOpen}
              closeSignUpModal={() => setSignUpOpen(false)}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default LoginModal;
