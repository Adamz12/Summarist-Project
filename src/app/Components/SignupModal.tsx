"use client";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { SubmitHandler, useForm } from "react-hook-form";
import Foryou from "../pages/Foryou";
import Link from "next/link";
import useAuth from "../../../useHooks/useAuth";
import { useState, useRef } from "react";
import { auth } from "../../../firebase";
import { CgSpinner } from "react-icons/cg";
import { changePage } from "../redux/pageSlice";
import { useDispatch } from "react-redux";
import { AuthError } from "firebase/auth";

interface SignupModalProps {
  isSignUpModalOpen: boolean;
  closeSignUpModal: () => void;
  openLoginModal: () => void;
}

function SignupModal({
  isSignUpModalOpen,
  closeSignUpModal,
  openLoginModal,
}: SignupModalProps) {
  const { googleLogin } = useAuth();
  const dispatch = useDispatch();
  const [error, setError] = useState<AuthError | null>(null);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const { registerEmailAndPassword } = useAuth();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const signUpAccount = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      if (email !== undefined && password !== undefined) {
        registerEmailAndPassword(email, password);
        setSignUpLoading(true);

        setTimeout(() => {
          dispatch(changePage("ForYou"));
        }, 2000);
      }
    } catch (error) {
      console.error("Register failed with error:", error);
    }
  };

  const closeSignUpOnly = () => {
    if (isSignUpModalOpen) {
      closeSignUpModal();
    }
  };

  const openLoginModalOnly = () => {
    closeSignUpOnly();
    openLoginModal();
  };

  const handleGoogleLogin = () => {
    googleLogin();
  };

  return (
    <div>
      <Modal
        className={`modal ${isSignUpModalOpen ? "" : "hidden"}`}
        open={isSignUpModalOpen}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="modal__box" sx={{ height: 460, width: 420 }}>
          <button onClick={closeSignUpModal}>
            <AiOutlineClose className="x-icon" />
          </button>
          <h2 className="modal-title">Sign up to Summarist</h2>
          <div className="modal__content">
            <button
              className="btn__modal btn__google"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="google__icon" />
              <h3 className="btn__title">Sign up with Google</h3>
            </button>
            <form onSubmit={signUpAccount}>
              <div className="seperator">
                <div className="border__line"></div>
                <div className="optional">or</div>
                <div className="border__line"></div>
              </div>
              <div className="login__container">
                <label className="modal__login">
                  <input
                    type="email"
                    placeholder="Email"
                    className="input"
                    ref={emailRef}
                  />
                  {error && (
                    <p className="p-1 text-[13px] font-light  text-orange-500">
                      Please enter a valid email.
                    </p>
                  )}
                </label>
                <label className="modal__login">
                  <input
                    type="password"
                    placeholder="Password"
                    className="input"
                    ref={passwordRef}
                  />
                  {error && (
                    <p className="p-1 text-[13px] font-light  text-orange-500">
                      Your password must contain between 6 and 60 characters.
                    </p>
                  )}
                </label>
                <button className="btn__modal btn__login" type="submit">
                  {signUpLoading ? (
                    <figure className="spinner__wrapper">
                      <CgSpinner className="spinner__modal" />
                    </figure>
                  ) : (
                    "Sign up"
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="modal__sign-up--wrapper">
            <div className="modal__create-account" onClick={openLoginModalOnly}>
              Already have an account?
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default SignupModal;
