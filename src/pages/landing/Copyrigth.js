import { Typography } from "@material-ui/core";
import React from "react";

function Copyrigth() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {/* <Link color="inherit">KALIJAGA-Coding</Link>  */}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyrigth;
