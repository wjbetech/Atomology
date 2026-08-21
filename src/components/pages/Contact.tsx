import React from "react";
import Layout from "../layout/Layout";
import ContactContent from "../ContactContent";

export default function Contact() {
  return (
    <Layout>
      <div
        className="w-full flex-1 flex items-center justify-center overflow-auto"
        style={{
          paddingTop: "var(--site-navbar-height)",
          paddingBottom: "var(--site-footer-height)",
        }}
      >
        <ContactContent />
      </div>
    </Layout>
  );
}
