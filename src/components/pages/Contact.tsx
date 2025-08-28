import React from "react";
import Layout from "../layout/Layout";
import ContactContent from "../ContactContent";

type Props = {};

export default function Contact({}: Props) {
  return (
    <Layout>
      <div
        className="w-full flex-1 flex items-center justify-center overflow-auto"
        style={{
          WebkitOverflowScrolling: "touch" as any,
          paddingTop: "var(--site-navbar-height)",
          paddingBottom: "var(--site-footer-height)",
        }}
      >
        <ContactContent />
      </div>
    </Layout>
  );
}
