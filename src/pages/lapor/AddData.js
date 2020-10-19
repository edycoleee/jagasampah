import {
  Box,
  Button,
  Grid,
  Paper,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import AlertSnackbar from "../../components/AlertSnackbar";
import { DataContext } from "./ContextData";

function AddData() {
  const { users } = useContext(AuthContext);
  const {
    SaveData,
    AddDummyData,
    mapPoints,
    simpanFileImg1,
    simpanFileImg2,
    progressUploud,
  } = useContext(DataContext);

  //State Sampah----------------------------
  const [c_ket, setKeterangan] = useState("");
  const [c_lokasi, setLokasi] = useState("");
  const [c_noHP, setNoHP] = useState("");

  const [fileImg1, setFileImg1] = useState(null);
  const [fileImg2, setFileImg2] = useState(null);

  //State SnackBar----------------------------
  const [errMessage, setErrMessage] = useState("");
  const [openErr, setOpenErr] = useState(false);

  const onFileChangeImg1 = (e) => {
    setFileImg1(e.target.files[0]);
  };
  const onFileChangeImg2 = (e) => {
    setFileImg2(e.target.files[0]);
  };
  //Simpan Data------------------------------

  const errorValid = (code, message) => {
    setErrMessage({ code, message });
    setOpenErr(true);
  };
  const onSimpan = async () => {
    if (c_lokasi === "") {
      return errorValid("ERROR", "ISILAH LOKASI SAMPAH");
    }
    if (c_ket === "") {
      return errorValid("ERROR", "ISILAH KETERANGAN");
    }
    if (fileImg1 === null) {
      return errorValid("ERROR", "MASUKKAN FOTO1");
    }
    if (fileImg2 === null) {
      return errorValid("ERROR", "MASUKKAN FOTO2");
    }
    const maxAllowedSize = 5 * 1024 * 1024;
    if (fileImg1.size > maxAllowedSize) {
      return errorValid("ERROR", "FOTO1 MAX 5MB");
    }
    if (fileImg2.size > maxAllowedSize) {
      return errorValid("ERROR", "FOTO2 MAX 5MB");
    }

    console.log("SIMPAN DATA");
    let id=""
    const newData = {
      c_noHP,
      c_ket,
      c_lokasi,
      c_lat: latit,
      c_lon: longi,
      c_namafile1: fileImg1.name,
      c_fileImg1: "",
      c_namafile2: fileImg2.name,
      c_fileImg2: "",
      c_user: users.c_username,
    };
    await SaveData(newData)
      .then((doc) => {
        id = doc.id;
        console.log("Save Data : ", doc.id);
      })
      .then(() => {
        setErrMessage({
          code: "SUCCESS",
          message: "Proses Menyimpan Data",
        });
        setOpenErr(true);
        ClearState();
      });
    await simpanFileImg1(fileImg1, id);
    await simpanFileImg2(fileImg2, id);
  };

  //Close SnackBar----------------------------
  const handleCloseErr = () => {
    setOpenErr(false);
  };

  //Close SnackBar----------------------------
  const ClearState = () => {
    setKeterangan("");
    setLokasi("");
    setNoHP("");
  };

  let latit = "";
  let longi = "";
  if (mapPoints[0]) {
    const map = mapPoints[0];
    latit = map[0];
    longi = map[1];
  }

  return (
    <div>
      <Paper elevation={2}>
        <Box pt={2} pb={2} ml={2} mr={2}>
          <Grid container spacing={3}>
            <Box mt={2} />
            <Grid item xs={12}>
              <Typography variant="subtitle2" align="center">
                PROSES : LAPOR => JADWAL => JEMPUT
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" align="center">
                Location Latitude : {mapPoints[0] ? latit : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" align="center">
                Location Longitude : {mapPoints[0] ? longi : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="c_lokasi"
                name="c_lokasi"
                label="Lokasi"
                fullWidth
                autoComplete="c_lokasi"
                onChange={(e) => setLokasi(e.target.value)}
                value={c_lokasi || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="c_noHP"
                name="c_noHP"
                label="No HP "
                fullWidth
                autoComplete="c_noHP"
                onChange={(e) => setNoHP(e.target.value)}
                value={c_noHP || ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={3}
                placeholder="Keterangan Laporan"
                id="c_ket"
                name="c_ket"
                onChange={(e) => setKeterangan(e.target.value)}
                value={c_ket || ""}
              />
            </Grid>
            <Grid item xs={12}>
              UPLOUD GAMBAR MAX 5MB
            </Grid>
            <Grid item xs={12}>
              <input type="file" onChange={onFileChangeImg1} />
            </Grid>
            <Grid item xs={12}>
              <input type="file" onChange={onFileChangeImg2} />
            </Grid>
            <Box mt={2} />
            <Grid item xs={12} sm={6}>
              <Button
                onClick={onSimpan}
                variant="contained"
                color="primary"
                disabled={progressUploud}
              >
                LAPOR
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
            <Grid item xs={12}>
              *** bagi pelapor akan diberikan bingkisan menarik
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <AlertSnackbar
        open={openErr}
        handleClose={handleCloseErr}
        errMessage={errMessage}
      />
    </div>
  );
}

export default AddData;
