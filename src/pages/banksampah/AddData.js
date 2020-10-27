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
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { CL_KELOLABANK } from "../../util/dbschema";
import { AuthContext } from "../../context/AuthContext";
import AlertSnackbar from "../../components/AlertSnackbar";
import { DataContext } from "./ContextData";
import { Develop } from "../../util/firebase";
import {DEMAKLOC} from "../../util/dbkecamatan"
import PilihKecamatan from "../../components/PilihKecamatan";
import GetMapLocation from "../../components/GetMapLocation";

function AddData() {
  const { users } = useContext(AuthContext);
  const {
    SaveData,
    c_tanggal,
    UploudBankSampah,
  } = useContext(DataContext);

  //Get Location
  const [mapPoints, setMapPoints] = useState(DEMAKLOC);
  const [c_kecamatan, setKecamatan] = useState("");
  const [c_desa, setDesa] = useState("");

  //State Sampah----------------------------
  const [c_nama, setNama] = useState("");
  const [c_alamat, setAlamat] = useState("");
  const [c_tempat, setTempat] = useState("");
  const [c_Sktetap, setSKTetap] = useState("");
  const [c_pengelola, setPengelola] = useState("SISWA");
  const [c_ket, setKet] = useState("");

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

    //State PortalMap------------------------------
    const [openPortalMap, setOpenPortalMap] = useState(false);
    const onOpenDialogMap = () => {
      setOpenPortalMap(true);
    };
  
    const handleCloseMap = () => {
      setOpenPortalMap(false);
    };

  //Option Pengelola-----------------------------------
  let pilihPengelola = CL_KELOLABANK;
  pilihPengelola = pilihPengelola.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  const onMessage = (code, message) => {
    setErrMessage({
      code,
      message,
    });
    setOpenErr(true);
  };

  //Simpan Data------------------------------
  const onSimpan = async () => {
    if (c_nama === "") {
      return onMessage("ERROR", "Nama Bank Sampah Kosong");
    }
    if (c_alamat === "") {
      return onMessage("ERROR", "Alamat Bank Sampah Kosong");
    }
    if (c_kecamatan === "") {
      return onMessage("ERROR", "Alamat Kecamatan Sampah Kosong");
    }
    if (c_desa === "") {
      return onMessage("ERROR", "Alamat Desa/Kel Kosong");
    }

    let tgl = new Date(c_tanggal);
    let tahun = String(tgl.getFullYear());
    let bulan = String(tgl.getMonth() + 1);
    const newData = {
      c_nama,
      c_alamat,
      c_tempat,
      c_kecamatan,
      c_desa,
      c_lang: mapPoints[0],
      c_long: mapPoints[1],
      c_Sktetap,
      c_pengelola,
      c_ket,
      c_bulan: bulan,
      c_tahun: tahun,
      c_user: users.c_username,
    };

    await SaveData(newData).then(() => {
      setErrMessage({
        code: "SUCCESS",
        message: "Data Sudah Tersimpan",
      });
      setOpenErr(true);
      handleClose();
      ClearState();
    });
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
    setNama("");
    setAlamat("");
    setKecamatan("");
    setDesa("");
  };

  return (
    <div>
      <Paper elevation={2}>
        <Box pt={2} pb={2} ml={2} mr={2}>
          <Grid container spacing={3}>
            <Box mt={2} />
            <Grid item xs={12} sm={6}>
              <Button
                onClick={onOpenDialogMap}
                variant="contained"
                color="primary"
                disabled={users.c_tipeuser === "admin" ? false : true}
              >
                MAP LOKASI
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={onOpenDialog}
                variant="contained"
                color="secondary"
                disabled={users.c_tipeuser === "admin" && c_kecamatan!=="" ? false : true}
              >
                TAMBAH DATA
              </Button>
            </Grid>
            {/* ----------------Uploud Dummy Data */}
            {!Develop ? (
              <Grid item xs={12} sm={6}>
                <Button
                  onClick={() => UploudBankSampah()}
                  variant="contained"
                  color="primary"
                  disabled={false}
                >
                  DUMMY DATA
                </Button>
              </Grid>
            ) : (
              ""
            )}
          <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">
                Location Latitude : {mapPoints ? mapPoints[0] : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">
                Location Longitude : {mapPoints ? mapPoints[1] : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">
                Kecamatan : {c_kecamatan && c_kecamatan}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">
                Desa/Kel : {c_desa && c_desa}
              </Typography>
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
                id="c_nama"
                name="c_nama"
                label="Nama Bank Sampah"
                fullWidth
                autoComplete="c_nama"
                onChange={(e) => setNama(e.target.value)}
                value={c_nama || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>Pengelola : </label>
              <select
                id="c_pengelola"
                onChange={(e) => setPengelola(e.currentTarget.value)}
                value={c_pengelola || ""}
              >
                {pilihPengelola}
              </select>
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
              <TextField
                required
                id="c_tempat"
                name="c_tempat"
                label="Lokasi "
                fullWidth
                autoComplete="c_tempat"
                onChange={(e) => setTempat(e.target.value)}
                value={c_tempat || ""}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <label>Kecamatan : </label>
              <select
                id="c_kecamatan"
                onChange={onChangeKec}
                value={c_kecamatan || ""}
              >
                {pilihKec}
              </select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>Desa/Kel : </label>
              <select
                id="c_desa"
                onChange={(e) => setDesa(e.currentTarget.value)}
                value={c_desa || ""}
                //disabled={!editing}
              >
                {pilihDesa}
              </select>
            </Grid> */}
            {/* <Grid item xs={12} sm={6}>
              <TextField
                required
                id="c_lang"
                name="c_lang"
                label="Langitude"
                fullWidth
                autoComplete="c_lang"
                onChange={(e) => setLang(e.target.value)}
                value={c_lang || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="c_long"
                name="c_long"
                label="Longitude"
                fullWidth
                autoComplete="c_long"
                onChange={(e) => setlong(e.target.value)}
                value={c_long || ""}
              />
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="c_Sktetap"
                name="c_Sktetap"
                label="SK Penetapan"
                fullWidth
                autoComplete="c_Sktetap"
                onChange={(e) => setSKTetap(e.target.value)}
                value={c_Sktetap || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="c_ket"
                name="c_ket"
                label="Keterangan"
                fullWidth
                autoComplete="c_ket"
                onChange={(e) => setKet(e.target.value)}
                value={c_ket || ""}
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
      {/* -------------------------------Dialog Map------------------- */}
      <Dialog open={openPortalMap} onClose={handleCloseMap} fullWidth>
        <DialogTitle id="alert-dialog-title">PILIH LOKASI </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>

          <PilihKecamatan c_kecamatan={c_kecamatan} 
          setKecamatan={setKecamatan} c_desa={c_desa} setDesa={setDesa} />
          <GetMapLocation mapPoints={mapPoints} setMapPoints={setMapPoints}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMap} variant="contained" color="primary">
            PILIH
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
