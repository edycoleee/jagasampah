import React, { useContext } from "react";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { AuthContext } from "../context/AuthContext";

function ScrollButton() {
  const { height } = useContext(AuthContext);
  const scrollBackToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <button
      className={height > 100 ? "scroll-btn show-scroll-btn" : "scroll-btn"}
      onClick={scrollBackToTop}
    >
      <ArrowUpwardIcon />
    </button>
  );
}

export default ScrollButton;
