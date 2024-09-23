import React from "react";

// react-router for useLocation
import { Link, useLocation } from "react-router-dom";

type Props = {};

export default function Navbar({}: Props) {
  // get current page
  const location = useLocation();

  return (
    <nav className="p-6 flex fixed w-screen justify-center gap-4">
      {/* make sure pages don't load links to themselves */}
      {location.pathname !== "/" && <Link to="/">Main</Link>}
      {location.pathname !== "/about" && <Link to="/about">About</Link>}
      {location.pathname !== "/faq" && <Link to="/faq">FAQ</Link>}
    </nav>
  );
}
