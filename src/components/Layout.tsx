import React from "react";

// components
import Navbar from "./Navbar";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center max-w-full m-auto pt-20 lg:pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
}
