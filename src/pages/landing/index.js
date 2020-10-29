import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import LandingPage from "./LandingPage";
import FooterPage from "./FooterPage";
import AppbarLanding from "./AppbarLanding";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Landing() {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* App Bar ------------------------------------------------------- */}
      <CssBaseline />
      <AppbarLanding />
      {/* Content Point----------------------------------------------------- */}
      <LandingPage classes={classes}/>
      {/* Footer ------------------------------------------------------------*/}
      <FooterPage  className={classes.footer}/>
      {/* End footer */}
    </React.Fragment>
  );
}
