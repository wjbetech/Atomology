import React from "react";

// components
import Navbar from "./Navbar";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen w-screen bg-neutral">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center max-w-[33%] m-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}
