import React, { useEffect } from "react";
import Image from "next/image";
import navLogo from "../public/assets/logo.png";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { CiBookmark, CiSettings } from "react-icons/ci";
import { PiPencilSimpleLine } from "react-icons/pi";
import { FiLogIn } from "react-icons/fi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../redux/pageSlice";
import useAuth from "../../../useHooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import {
  openLoginModal,
  closeLoginModal,
  openSignUpModal,
  closeSignUpModal,
} from "../redux/modalSlice";
import { setEmailLoginRef } from "../redux/userSlice";

function Sidebar() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("");
  const currentPage = useSelector((state) => state.currentPage);
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.emailLoginRef.emailLoginRef);
  const { isLoginModalOpen, isSignUpModalOpen } = useSelector(
    (state) => state.modals
  );
  const isOpen = useSelector((state) => state.sidebar.isOpen);

  const router = useRouter();

  const handleClick = (tabName: string) => {
    if (currentPage === tabName) {
      console.log(`Tab ${tabName} is already active`);
      return;
    }

    console.log(`Changing active tab to ${tabName}`);
    setActiveTab(tabName);
    dispatch(changePage(tabName));
  };

  const handleLogout = () => {
    dispatch(setEmailLoginRef(""));
    logout();
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

  return (
    <section className={`foryou__sidebar ${isOpen ? "sidebar__opened" : ""}`}>
      <figure className="foryou__logo--wrapper">
        <Image className="foryou__logo" src={navLogo} />
      </figure>
      <div className="foryou__list--wrapper">
        <ul className="navigation__list">
          <Link
            className="sidebar__links"
            onClick={() => handleClick("ForYou")}
            href="/foryou"
          >
            <div
              className={`sidebar__link--line ${
                currentPage === "ForYou" ? "active--tab" : ""
              }`}
            ></div>
            <AiOutlineHome className="sidebar__icon" /> For you
          </Link>
          <li className="sidebar__links--no-cursor">
            <div className="sidebar__link--line"></div>
            <CiBookmark className="sidebar__icon" /> My Library
          </li>
          <li className="sidebar__links--no-cursor">
            <div className="sidebar__link--line"></div>
            <PiPencilSimpleLine className="sidebar__icon" /> Highlights
          </li>
          <li className="sidebar__links--no-cursor">
            <div className="sidebar__link--line"></div>
            <AiOutlineSearch className="sidebar__icon" /> Search
          </li>
        </ul>
        <ul className="settings__list">
          <Link
            className="sidebar__links"
            onClick={() => handleClick("Settings")}
            href="/settings"
          >
            <div
              className={`sidebar__link--line ${
                currentPage === "Settings" ? "active--tab" : ""
              }`}
            ></div>
            <CiSettings className="sidebar__icon" /> Settings
          </Link>

          <li className="sidebar__links--no-cursor">
            <div className="sidebar__link--line"></div>
            <AiOutlineQuestionCircle className="sidebar__icon" /> Help & Support
          </li>

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

          <li
            className="sidebar__links"
            onClick={userEmail ? () => handleLogout() : () => handleLogin()}
          >
            <div className="sidebar__link--line"></div>
            <FiLogIn className="sidebar__icon" />
            {userEmail ? "Logout" : "Login"}
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Sidebar;
