import React from "react";
import Layout from "../layout/Layout";
import FaqContent from "../FaqContent";

type Props = {};

export default function Faq({}: Props) {
  return (
    <Layout>
      <div className="w-full flex-1 flex text-center items-center justify-center">
        <FaqContent />
      </div>
    </Layout>
  );
}
