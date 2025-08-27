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
      <Navbar />
      <main
        className="flex flex-col items-center justify-start max-w-full m-auto w-full overflow-y-auto"
        style={{
          height: "calc(var(--vh, 1vh) * 100)",
          paddingTop: "var(--site-navbar-height)",
          paddingBottom: "var(--site-footer-height)",
          boxSizing: "border-box",
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
