import React, { useEffect } from "react";
import Image from "next/image";
import navLogo from "../public/assets/logo.png";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { TbTextSize } from "react-icons/tb";
import { CiBookmark, CiSettings } from "react-icons/ci";
import { PiPencilSimpleLine } from "react-icons/pi";
import { VscTextSize } from "react-icons/vsc";
import { FiLogIn } from "react-icons/fi";
import { useState } from "react";
import Personal from "./Personal";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../redux/pageSlice";
import useAuth from "../../../useHooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setTextSize } from "../redux/textSlice";
import { setEmailLoginRef } from "../redux/userSlice";
import {
  closeLoginModal,
  closeSignUpModal,
  openLoginModal,
  openSignUpModal,
} from "../redux/modalSlice";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

interface RootState {
  currentPage: string;
  emailLoginRef: {
    emailLoginRef: string;
  };
  modals: {
    isLoginModalOpen: boolean;
    isSignUpModalOpen: boolean;
  };
  sidebar: {
    isOpen: boolean;
  };
  textSize: {
    textSize: string;
  };
}

function SidebarPlayer() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("");
  const currentPage = useSelector((state: RootState) => state.currentPage);
  const dispatch = useDispatch();
  const router = useRouter();
  const userEmail = useSelector(
    (state: { emailLoginRef: { emailLoginRef: string } }) =>
      state.emailLoginRef.emailLoginRef
  );
  const textSize = useSelector((state: RootState) => state.textSize.textSize);
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const { isLoginModalOpen, isSignUpModalOpen } = useSelector(
    (state: RootState) => state.modals
  );

  const handleClick = (tabName: string) => {
    if (currentPage === tabName) {
      console.log(`Tab ${tabName} is already active`);
      return;
    }

    console.log(`Changing active tab to ${tabName}`);
    setActiveTab(tabName);
    dispatch(changePage(tabName));
  };

  const handleTextSizeChange = (size: string) => {
    if (textSize === size) {
      console.log(`Tab ${size} is already active`);
      return;
    }

    console.log(`Changing active tab to ${size}`);
    dispatch(setTextSize(size));
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
        <Image className="foryou__logo" src={navLogo} alt={""} />
      </figure>
      <div className="foryou__list--wrapper--player">
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
          <li
            className="sidebar__links"
            onClick={() => handleClick("MyLibrary")}
          >
            <div
              className={`sidebar__link--line ${
                activeTab === "MyLibrary" ? "active--tab" : ""
              }`}
            ></div>
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

          <li className="sidebar__links text__icons">
            <div className="sidebar__icons--wrapper">
              <div
                className="sidebar__icon--wrapper"
                onClick={() => {
                  handleClick("TextSmall");
                  handleTextSizeChange("small");
                }}
              >
                <TbTextSize className="sidebar__icon small__text" />
              </div>
              <div
                className="sidebar__icon--wrapper"
                onClick={() => {
                  handleClick("TextMedium");
                  handleTextSizeChange("medium");
                }}
              >
                <TbTextSize className="sidebar__icon medium__text" />
              </div>
              <div
                className="sidebar__icon--wrapper"
                onClick={() => {
                  handleClick("TextLarge");
                  handleTextSizeChange("large");
                }}
              >
                <TbTextSize className="sidebar__icon large__text" />
              </div>
              <div
                className="sidebar__icon--wrapper"
                onClick={() => {
                  handleClick("TextXl");
                  handleTextSizeChange("xl");
                }}
              >
                <TbTextSize className="sidebar__icon xl__text" />
              </div>
            </div>
          </li>
          <div className="underline__wrapper">
            <div
              className={`sidebar__link--underline ${
                activeTab === "TextSmall" ? "active--tab--2" : ""
              }`}
            ></div>
            <div
              className={`sidebar__link--underline ${
                activeTab === "TextMedium" ? "active--tab--2" : ""
              }`}
            ></div>
            <div
              className={`sidebar__link--underline ${
                activeTab === "TextLarge" ? "active--tab--2" : ""
              }`}
            ></div>
            <div
              className={`sidebar__link--underline ${
                activeTab === "TextXl" ? "active--tab--2" : ""
              }`}
            ></div>
          </div>
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

export default SidebarPlayer;
