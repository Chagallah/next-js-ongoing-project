import React from "react";
import $ from "jquery";

function Wrapper({ children }) {
  if (typeof window !== "undefined") {
    window.$ = window.jQuery = $;
  }
  return <>{children}</>;
}

export default Wrapper;
