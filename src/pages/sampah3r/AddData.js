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
  const {
    SaveData,
    c_tanggal,
    setTanggal,
    idBank,
    nmBank,
    setIdBank,
    setNmBank,
    GetDataFTgl,
    GetDataFTglAdmin,
  } = useContext(DataContext);

  //State Sampah----------------------------
  const [n_plastik, setPlastik] = useState(0);
  const [n_organik, setOrganik] = useState(0);
  const [n_kertas, setKertas] = useState(0);
  const [n_kaca, setKaca] = useState(0);
  const [n_karet, setKaret] = useState(0);
  const [n_kayu, setKayu] = useState(0);
  const [n_lain, setLain] = useState(0);

  //State SnackBar----------------------------
  const [errMessage, setErrMessage] = useState("");
  const [openErr, setOpenErr] = useState(false);
  //State Portal------------------------------
  const [openPortal, setOpenPortal] = useState(false);
  const onOpenDialog = () => {
    if (idBank === "") {
      setIdBank(users.c_defBankID);
      setNmBank(users.c_defBankName);
    }
    setOpenPortal(true);
  };

  const handleClose = () => {
    setOpenPortal(false);
  };
  //Simpan Data------------------------------
  const onSimpan = () => {
    const onValid = (code, message) => {
      setErrMessage({
        code,
        message,
      });
      setOpenErr(true);
    };

    if (
      n_organik + n_plastik + n_kertas + n_kaca + n_karet + n_kayu + n_lain ===
      0
    ) {
      return onValid("ERROR", "Jumlah Semua 0");
    }

    if (!idBank) {
      return onValid("ERROR", "PILIH BANK SAMPAH");
    }
    if (idBank === "") {
      return onValid("ERROR", "PILIH BANK SAMPAH");
    }
    let tgl = new Date(c_tanggal);
    let tahun = String(tgl.getFullYear());
    let bulan = String(tgl.getMonth() + 1);
    const newData = {
      n_plastik,
      n_organik,
      n_kertas,
      n_kaca,
      n_karet,
      n_kayu,
      n_lain,
      c_tanggal,
      c_bulan: bulan,
      c_tahun: tahun,
      c_user: users.c_username,
      idBank,
      nmBank,
    };
    console.log(newData);
    SaveData(newData);
    setErrMessage({
      code: "SUCCESS",
      message: "Data Sudah Tersimpan",
    });
    setOpenErr(true);
    handleClose();
    ClearState();
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
    setPlastik(0);
    setOrganik(0);
    setKertas(0);
    setKaca(0);
    setKaret(0);
    setKayu(0);
    setLain(0);
  };

  const onCariData = () =>{
    if (users.c_tipeuser === "admin") {
      GetDataFTglAdmin(c_tanggal);
    } else {
      GetDataFTgl(c_tanggal, users.c_defBankID);
    }
  }

  return (
    <div>
      <Paper elevation={2}>
        <Box pt={2} pb={2} ml={2} mr={2}>
          <Grid container spacing={3}>
            <Box mt={2} />
            <Grid item xs={12} sm={6}>
              Tanggal :
              <input
                name="c_tanggal"
                placeholder="dd-mm-yyyy"
                value={c_tanggal}
                type="date"
                onChange={(e) => setTanggal(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={onCariData}
                variant="contained"
                color="primary"
              >
                CARI
              </Button>{" "}
              <Button
                onClick={onOpenDialog}
                variant="contained"
                color="secondary"
              >
                TAMBAH DATA
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
            <Grid item xs={12}>
              <label>Bank Sampah : {nmBank}</label>
            </Grid>
            <Grid item xs={12} sm={6}>
              Tanggal :
              <input
                name="c_tanggal"
                placeholder="dd-mm-yyyy"
                value={c_tanggal}
                type="date"
                onChange={(e) => setTanggal(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="n_plastik"
                name="n_plastik"
                label="Plastik (kg)"
                type="number"
                fullWidth
                autoComplete="n_plastik"
                onChange={(e) => setPlastik(e.target.value)}
                value={n_plastik || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="n_organik"
                name="n_organik"
                label="Organik (kg)"
                type="number"
                fullWidth
                autoComplete="n_organik"
                onChange={(e) => setOrganik(e.target.value)}
                value={n_organik || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="n_kertas"
                name="n_kertas"
                label="Kertas (kg)"
                type="number"
                fullWidth
                autoComplete="n_kertas"
                onChange={(e) => setKertas(e.target.value)}
                value={n_kertas || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="n_kaca"
                name="n_kaca"
                label="Kaca (kg)"
                type="number"
                fullWidth
                autoComplete="n_kaca"
                onChange={(e) => setKaca(e.target.value)}
                value={n_kaca || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="n_karet"
                name="n_karet"
                label="Karet (kg)"
                type="number"
                fullWidth
                autoComplete="n_karet"
                onChange={(e) => setKaret(e.target.value)}
                value={n_karet || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="n_kayu"
                name="n_kayu"
                label="Kayu (kg)"
                type="number"
                fullWidth
                autoComplete="n_kayu"
                onChange={(e) => setKayu(e.target.value)}
                value={n_kayu || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="n_lain"
                name="n_lain"
                label="Lain2 (kg)"
                type="number"
                fullWidth
                autoComplete="n_lain"
                onChange={(e) => setLain(e.target.value)}
                value={n_lain || ""}
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
