import React from "react";
import Layout from "../layout/Layout";
import AboutContent from "../AboutContent";

// ...existing code...

export default function About() {
  return (
    <Layout>
      <div
        className="w-full flex-1 flex items-center justify-center overflow-auto"
        style={{
          WebkitOverflowScrolling: "touch" as any,
          paddingTop: "var(--site-navbar-height)",
          paddingBottom: "var(--site-footer-height)",
          boxSizing: "border-box",
        }}
      >
        <AboutContent />
      </div>
    </Layout>
  );
}
