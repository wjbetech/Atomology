import React from "react";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav className="p-6 flex fixed w-screen justify-center">
      <div className="flex gap-4">
        <a href="/">Main</a>
        <a href="/about">About</a>
        <a href="/faq">FAQ</a>
      </div>
    </nav>
  );
}
