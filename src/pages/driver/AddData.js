import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  TextField,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import AlertSnackbar from "../../components/AlertSnackbar";
import { DataContext } from "./ContextData";

function AddData() {
  const { users } = useContext(AuthContext);
  const { SaveData,AddDummyData } = useContext(DataContext);

  //State Sampah----------------------------
  const [c_driver, setDriver] = useState("");
  const [c_nopol, setNopol] = useState("");
  const [c_kendaraan, setKendaraan] = useState("");
  const [c_jenis, setJenis] = useState("");
  //State SnackBar----------------------------
  const [errMessage, setErrMessage] = useState("");
  const [openErr, setOpenErr] = useState(false);
  //State Portal------------------------------
  const [openPortal, setOpenPortal] = useState(false);
  const onOpenDialog = () => {
    setOpenPortal(true);
  };

  const handleClose = () => {
    setOpenPortal(false);
  };
  //Simpan Data------------------------------
  const onSimpan = () => {
    if (c_driver === "" || c_nopol === "") {
      setErrMessage({
        code: "ERROR",
        message: "Isilah Form yang lengkap",
      });
      setOpenErr(true);
    } else {
      const newData = {
        c_driver,
        c_nopol,
        c_kendaraan,
        c_jenis,
        c_user: users.c_username,
      };
      SaveData(newData);
      setErrMessage({
        code: "SUCCESS",
        message: "Data Sudah Tersimpan",
      });
      setOpenErr(true);
      handleClose();
      ClearState();
    }
  };

  //Close SnackBar----------------------------
  const handleCloseErr = () => {
    setOpenErr(false);
  };

  //Batal Simpan----------------------------
  const onBatal = () => {
    handleClose();
    ClearState();
  };

  //Close SnackBar----------------------------
  const ClearState = () => {
    setDriver("");
    setNopol("");
    setKendaraan("");
    setJenis("");
  };

  return (
    <div>
      <Paper elevation={2}>
        <Box pt={2} pb={2} ml={2} mr={2}>
          <Grid container spacing={3}>
            <Box mt={2} />
            <Grid item xs={12} sm={6}>
              <Button
                onClick={onOpenDialog}
                variant="contained"
                color="primary"
                disabled={(users.c_tipeuser === "admin") ? false : true}
              >
                TAMBAH DATA
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={() => AddDummyData()}
                variant="contained"
                color="primary"
                disabled={true}
              >
                DUMMY DATA
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      {/* -----------------------Dialog Add------------------------ */}
      <Dialog open={openPortal} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">Tambah Data </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="c_nopol"
                name="c_nopol"
                label="No Polisi"
                fullWidth
                autoComplete="c_nopol"
                onChange={(e) => setNopol(e.target.value)}
                value={c_nopol || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="c_kendaraan"
                name="c_kendaraan"
                label="Nama Kendaraan"
                fullWidth
                autoComplete="c_kendaraan"
                onChange={(e) => setKendaraan(e.target.value)}
                value={c_kendaraan || ""}
              />
            </Grid>
          <Grid item xs={12} sm={6}>
              <TextField
                required
                id="c_driver"
                name="c_driver"
                label="Nama Driver"
                fullWidth
                autoComplete="c_driver"
                onChange={(e) => setDriver(e.target.value)}
                value={c_driver || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="c_jenis"
                name="c_jenis"
                label="Asal Kendaraan"
                fullWidth
                autoComplete="c_jenis"
                onChange={(e) => setJenis(e.target.value)}
                value={c_jenis || ""}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onBatal} variant="contained" color="primary">
            BATAL
          </Button>
          <Button onClick={onSimpan} variant="contained" color="primary">
            SIMPAN DATA
          </Button>
        </DialogActions>
      </Dialog>
      <AlertSnackbar
        open={openErr}
        handleClose={handleCloseErr}
        errMessage={errMessage}
      />
    </div>
  );
}

export default AddData;
