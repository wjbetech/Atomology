import React from "react";

// components
import Navbar from "./Navbar";

type Props = {};

export default function Layout({}: Props) {
  return (
    <div className="w-screen">
      <Navbar />
    </div>
  );
}
