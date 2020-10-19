import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AlertSnackbar({ open, handleClose, errMessage }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={errMessage.code === "ERROR" ? "error" : "success"}
      >
        <span>{errMessage.code ? `Code : ${errMessage.code}` : ""}</span>
        <br />
        <span>
          {errMessage.message ? `Message : ${errMessage.message}` : ""}
        </span>
      </Alert>
    </Snackbar>
  );
}

export default AlertSnackbar;
