import React from "react";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav className="p-6 flex items-baseline justify-center">
      <div className="flex gap-4">
        <a href="/about">About</a>
        <a href="/faq">FAQ</a>
      </div>
    </nav>
  );
}
