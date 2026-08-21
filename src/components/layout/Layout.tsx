import React from "react";

// components
import Navbar from "./Navbar";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div
      className="flex flex-col w-full relative overflow-x-hidden"
      style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}
    >
      {/* The navbar self-gates: in-game header while playing, site links otherwise */}
      <Navbar />
      <main
        className="flex flex-col items-center justify-start max-w-full m-auto w-full overflow-y-auto min-h-0"
        style={{
          // allow the main area to flex; use minHeight to avoid forcing overflow
          flex: "1 1 auto",
          minHeight:
            "calc(var(--vh, 1vh) * 100 - var(--site-navbar-height) - var(--site-footer-height))",
          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)",
          boxSizing: "border-box",
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
