import React from "react";
import { Link } from "react-router-dom";

function IndexError() {
  return (
    <div>
      <h3>Halaman ERROR</h3>
      <Link to="/">
        <h4>Kembali Landing Page</h4>
      </Link>
    </div>
  );
}

export default IndexError;
