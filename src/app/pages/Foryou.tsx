"use client";
import React, { useEffect } from "react";
import Personal from "../Components/Personal";
import Recommended from "../Components/Recommended";
import Searchbar from "../Components/Searchbar";
import Sidebar from "../Components/Sidebar";
import Suggested from "../Components/Suggested";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "../redux/sidebarSlice";
import { SkeletonTheme } from "react-loading-skeleton";

function Foryou() {
  const currentPage = useSelector((state) => state.currentPage);
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();

  const handleCloseSidebar = () => {
    if (isOpen) {
      dispatch(closeSidebar());
    }
  };

  return (
    <SkeletonTheme>
      <div className="foryou">
        <div
          className={`sidebar__opened ${isOpen ? "sidebar__overlay" : ""}`}
          onClick={handleCloseSidebar}
        ></div>
        <Sidebar />
        <div className="foryou__page--wrapper">
          <Searchbar />
          {currentPage === "ForYou" && (
            <div className="container">
              <React.Fragment>
                <Personal />
                <Recommended />
                <Suggested />
              </React.Fragment>
            </div>
          )}
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default Foryou;
