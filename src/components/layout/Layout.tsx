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
      <main className="flex flex-1 flex-col items-center justify-start max-w-full m-auto pt-20 lg:pt-24 w-full pb-24">
        {children}
      </main>
      <Footer />
    </div>
  );
}
