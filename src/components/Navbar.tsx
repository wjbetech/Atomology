import React from "react";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav className="p-6 bg-neutral flex justify-between items-baseline">
      <h1 className="text-neutral-content font-semibold text-2xl graduate-regular">Atomology</h1>
      <div className="flex gap-4">
        <a href="/about">About</a>
        <a href="/faq">FAQ</a>
      </div>
    </nav>
  );
}
