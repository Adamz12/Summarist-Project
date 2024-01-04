"use client";
import React from "react";
import { Provider } from "react-redux";
import Sales from "../pages/Sales";
import { store } from "../redux/store";

export default function Page() {
  return (
    <main>
      <Sales />
    </main>
  );
}