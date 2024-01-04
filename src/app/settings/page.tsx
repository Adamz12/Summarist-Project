"use client";
import { SkeletonTheme } from "react-loading-skeleton";
import { Provider, useDispatch, useSelector } from "react-redux";
import Sidebar from "../Components/Sidebar";
import Settings from "../Components/Settings";
import Searchbar from "../Components/Searchbar";
import { closeSidebar } from "../redux/sidebarSlice";

export default function Page() {
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
      <main>
        <div
          className={`sidebar__opened ${isOpen ? "sidebar__overlay" : ""}`}
          onClick={handleCloseSidebar}
        ></div>
        <Sidebar />
        <Searchbar />

        {currentPage === "Settings" && <Settings />}
      </main>
    </SkeletonTheme>
  );
}
