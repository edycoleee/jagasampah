import React, { useContext, useState } from "react";
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
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "./ContextData";
import { Develop } from "../../util/firebase";
import PilihKecamatan from "./PilihKecamatan";
import Notification from "../../components/Notification";
import Map from "./GetMap";

function AddData() {
  const { users } = useContext(AuthContext);
  const {
    SaveData,
    mapPoints,
    progressUploud,
    c_kecamatan,
    c_desa,
    simpanFileImg1,
    CekNamaFile,
  } = useContext(DataContext);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  //State Sampah----------------------------
  const [c_kontak, setKontak] = useState("");
  const [c_noHP, setNoHP] = useState("");
  const [c_alamat, setAlamat] = useState("");
  const [c_namaFile1, setNamaFile1] = useState("");
  const [c_keterangan, setKeterangan] = useState("");
  const [loading, setLoading] = useState("");

  const [fileImg1, setFileImg1] = useState(null);

  //State Portal------------------------------
  const [openPortal, setOpenPortal] = useState(false);
  const onOpenDialog = () => {
    setOpenPortal(true);
  };

  const handleClose = () => {
    setOpenPortal(false);
  };

  const onFileChangeImg1 = (e) => {
    setFileImg1(e.target.files[0]);
  };

  //Simpan Data------------------------------
  const onSimpan = async () => {
    if (mapPoints[0] === -6.8909) {
      return setNotify({
        isOpen: true,
        message: "Koordinat Kosong",
        type: "error",
      });
    }

    if (c_alamat === "") {
      return setNotify({
        isOpen: true,
        message: "Alamat Kosong",
        type: "error",
      });
    }

    if (c_kecamatan === "") {
      return setNotify({
        isOpen: true,
        message: "Kecamatan Kosong",
        type: "error",
      });
    }
    if (c_desa === "") {
      return setNotify({
        isOpen: true,
        message: "Desa Kosong",
        type: "error",
      });
    }
    console.log(fileImg1);
    if (fileImg1 === null) {
      return setNotify({
        isOpen: true,
        message: "File Gambar Kosong",
        type: "error",
      });
    } else {
      const maxAllowedSize = 5 * 1024 * 1024;
      if (fileImg1.size > maxAllowedSize) {
        return setNotify({
          isOpen: true,
          message: "File Gambar Melebihi 5MB",
          type: "error",
        });
      }
    }

    if (await CekNamaFile(fileImg1)) {
      return setNotify({
        isOpen: true,
        message: "Nama File Sama => Rename",
        type: "error",
      });
    }

    let id = "";
    const newData = {
      c_kontak,
      c_noHP,
      c_keterangan,
      c_alamat,
      c_kecamatan,
      c_desa,
      c_keterangan,
      c_lat: mapPoints[0],
      c_lon: mapPoints[1],
      c_namafile1: fileImg1.name,
      c_fileImg1: "",
      //c_user: users.c_username,
    };
    await setNotify({
      isOpen: true,
      message: "Proses Simpan Data",
      type: "info",
    });
    await setLoading(true);
    await SaveData(newData).then((doc) => {
      id = doc.id;
      if (Develop) {
        console.log("STEP : Save Data : ", doc.id);
      }
    });

    await simpanFileImg1(fileImg1, id);

    await setNotify({
      isOpen: true,
      message: "Data Telah Tersimpan",
      type: "success",
    });
    await ClearState();
    await setLoading(false);
  };

  //Clear State----------------------------
  const ClearState = () => {
    setKeterangan("");
    setNoHP("");
    setKontak("");
    setAlamat("");
  };

  const onLihat = () => {
    onOpenDialog();
  };

  return (
    <div>
      <Paper elevation={2}>
        <Box pt={2} pb={2} ml={2} mr={2}>
          <Grid container spacing={3}>
            <Box mt={2} />
            <Grid item xs={12}>
              <Button
                onClick={onLihat}
                variant="contained"
                color="primary"
                disabled={progressUploud}
              >
                AMBIL LOKASI
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" align="center">
                Location Latitude : {mapPoints ? mapPoints[0] : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" align="center">
                Location Longitude : {mapPoints ? mapPoints[1] : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" align="center">
                Kecamatan : {c_kecamatan && c_kecamatan}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" align="center">
                Desa/Kel : {c_desa && c_desa}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="c_kontak"
                name="c_kontak"
                label="Kontak"
                fullWidth
                autoComplete="c_kontak"
                onChange={(e) => setKontak(e.target.value)}
                value={c_kontak || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="c_noHP"
                name="c_noHP"
                label="No HP"
                fullWidth
                autoComplete="c_noHP"
                onChange={(e) => setNoHP(e.target.value)}
                value={c_noHP || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="c_alamat"
                name="c_alamat"
                label="Alamat"
                fullWidth
                autoComplete="c_alamat"
                onChange={(e) => setAlamat(e.target.value)}
                value={c_alamat || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={3}
                placeholder="Keterangan Laporan"
                id="c_keterangan"
                name="c_keterangan"
                onChange={(e) => setKeterangan(e.target.value)}
                value={c_keterangan || ""}
              />
            </Grid>
            <Grid item xs={12}>
              UPLOUD GAMBAR MAX 5MB
            </Grid>
            <Grid item xs={12}>
              <input type="file" onChange={onFileChangeImg1} />
            </Grid>
            <Box mt={2} />
            <Grid item xs={12} sm={6}>
              <Button
                onClick={onSimpan}
                variant="contained"
                color="primary"
                disabled={progressUploud}
              >
                SIMPAN DATA
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      {/* -----------------------Dialog Add------------------------ */}
      <Dialog open={openPortal} onClose={handleClose} fullWidth>
        <DialogTitle id="alert-dialog-title">PILIH LOKASI </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>

          <PilihKecamatan />
          <Map />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            PILIH
          </Button>
        </DialogActions>
      </Dialog>
      {/* -----------------------------SnackBar--------------------- */}
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default AddData;
