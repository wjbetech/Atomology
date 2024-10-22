import React from "react";
import { Link } from "react-router-dom";

type Props = {};

export default function Footer({}: Props) {
  return (
    <div className="p-4 flex flex-row gap-10 justify-center">
      <Link to="www.github.com/wjbetech">@wjbetech</Link>
    </div>
  );
}
