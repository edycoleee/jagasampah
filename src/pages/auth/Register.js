import React, { useCallback, useContext, useState } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import app, { Firebase, LocalServer, Develop } from "../../util/firebase";
import MuiAlert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
//material ui
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AlertSnackbar from "../../components/AlertSnackbar";
import moment from "moment";

const db = app.firestore();
//setting jika menggunakan emulator firestore
if (LocalServer) {
  db.settings({ host: "localhost:8080", ssl: false });
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = ({ history }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const { signup } = useContext(AuthContext);

  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password, username } = event.target.elements;
      if (username.value === "") {
        setErrMessage({
          ...errMessage,
          code: "ERROR",
          message: "User Name must not empty",
        });
        setOpen(true);
      } else {
        try {
          if (Develop) {
            console.log("STEP : REGISTER");
          }
          setLoading(false);
          await signup(email.value, password.value);
          const user = app.auth().currentUser;
          let uid;
          if (user != null) {
            uid = user.uid;
          }
          let tglserver1 = new Date(
            Firebase.firestore.Timestamp.now().seconds * 1000
          );
          let tglserver = moment(tglserver1).format("DD/MM/YYYY");
          await db.collection("CL_USER").doc(uid).set({
            c_username: username.value,
            c_createdAt: tglserver,
            c_defTPA: "KALIKONDANG",
            c_defTPST: "TPSTSATU",
            c_tipeuser: "user",
          });
          if (Develop) {
            console.log("STEP : SIMPAN USER");
          }
          setLoading(true);
          history.push("/dashboard");
        } catch (error) {
          setErrMessage(error);
          setOpen(true);
          setLoading(true);
        }
      }
    },
    [history, errMessage, signup]
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs" onSubmit={handleSignUp}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="User Name"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!loading}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              Already have an account? <Link to="login">Login</Link>
            </Grid>
            <Grid item>
              <Link to="/"> Landing Page</Link>
            </Grid>
          </Grid>
          <Box mt={5} />
          <Grid container justify="flex-end">
            <Grid item>
              <span>
                {errMessage.code ? (
                  <Alert severity="error">
                    `Error Code : ${errMessage.code}`
                  </Alert>
                ) : (
                  ""
                )}
              </span>
              <br />
              <span>
                {errMessage.message ? (
                  <Alert severity="error">
                    `Error Message : ${errMessage.message}`
                  </Alert>
                ) : (
                  ""
                )}
              </span>
            </Grid>
          </Grid>
        </form>
      </div>
      <AlertSnackbar
        open={open}
        handleClose={handleClose}
        errMessage={errMessage}
      />
    </Container>
  );
};

export default withRouter(Register);
