"use client";
import React from "react";
import { Provider } from "react-redux";
import Foryou from "../pages/Foryou";
import { store } from "../redux/store";

export default function Page() {
  return (
    
    <main>
      <Foryou />
    </main>
  );
}
