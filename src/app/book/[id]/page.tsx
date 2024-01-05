"use client";
import { Provider, useDispatch, useSelector } from "react-redux";
import Sidebar from "../../Components/Sidebar";
import Searchbar from "../../Components/Searchbar";
import BookPage from "@/app/pages/BookPage";
import { closeSidebar } from "@/app/redux/sidebarSlice";

interface RootState {
  sidebar: {
    isOpen: boolean;
  };
}

export default function Page() {
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const dispatch = useDispatch();

  const handleCloseSidebar = () => {
    if (isOpen) {
      dispatch(closeSidebar());
    }
  };

  return (
    <main>
      <div
        className={`sidebar__opened ${isOpen ? "sidebar__overlay" : ""}`}
        onClick={handleCloseSidebar}
      ></div>
      <Sidebar />
      <Searchbar />
      <BookPage />
    </main>
  );
}
