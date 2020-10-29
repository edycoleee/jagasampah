import React from "react";
import { Typography } from "@material-ui/core";
import { Copyright } from "@material-ui/icons";

function FooterPage() {
  return (
    <footer >
      <Typography variant="h6" align="center" gutterBottom>
        DLH DEMAK
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        Alamat : Jl. Bhayangkara Baru No 1 | Demak – 59515 | Telephon : (0291)
        685677 | Fax : (0291) 681911 | Email : dinlh@demakkab.go.id |
        http://dinlh.demakkab.go.id/
      </Typography>
      <Copyright />
    </footer>
  );
}

export default FooterPage;
