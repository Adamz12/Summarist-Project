"use client";
import { Provider, useDispatch, useSelector } from "react-redux";
import Searchbar from "../../Components/Searchbar";
import Player from "@/app/pages/Player";
import SidebarPlayer from "@/app/Components/SidebarPlayer";
import { closeSidebar } from "@/app/redux/sidebarSlice";

export default function Page() {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
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
        <SidebarPlayer />
        <Searchbar />
        <Player />
      </main>
  );
}
