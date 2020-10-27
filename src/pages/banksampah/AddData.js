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
import React, { useContext, useEffect, useState } from "react";
import { CL_KELOLABANK } from "../../util/dbschema";
import { AuthContext } from "../../context/AuthContext";
import AlertSnackbar from "../../components/AlertSnackbar";
import { DataContext } from "./ContextData";
import { Develop } from "../../util/firebase";
import {DEMAKLOC} from "../../util/dbkecamatan"

function AddData() {
  const { users } = useContext(AuthContext);
  const {
    SaveData,
    c_tanggal,
    kecamatan,
    GetKecData,
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
  const [c_lang, setLang] = useState("");
  const [c_long, setlong] = useState("");
  const [c_Sktetap, setSKTetap] = useState("");
  const [c_pengelola, setPengelola] = useState("SISWA");
  const [c_pildesa, setPilDesa] = useState([]);
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
      c_lang,
      c_long,
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
  };

  useEffect(() => {
    GetKecData();
  }, [GetKecData]);

  let pilihKec = kecamatan;
  //Option TPA-----------------------------------
  pilihKec = pilihKec.map((item, index) => {
    return (
      <option key={index} value={item.id}>
        {item.id}
      </option>
    );
  });

  let pilihDesa = c_pildesa.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  useEffect(() => {
    //console.log("kecamatan :", c_kecamatan);
    if (c_kecamatan !== "") {
      const L = kecamatan;
      const aa = L.filter((kec) => kec.id === c_kecamatan);
      const bb = aa[0].DESA;
      setPilDesa(bb);
      //console.log(aa, bb);
    }
  }, [c_kecamatan, kecamatan]);

  const onChangeKec = (e) => {
    const kecamatan = e.currentTarget.value;
    //console.log(kecamatan.id);
    setKecamatan(kecamatan);
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
                disabled={users.c_tipeuser === "admin" ? false : true}
              >
                TAMBAH DATA
              </Button>
            </Grid>
            {/* ----------------Uploud Dummy Data */}
            {Develop ? (
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
            <Grid item xs={12} sm={6}>
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
            </Grid>
            <Grid item xs={12} sm={6}>
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
            </Grid>
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
      <AlertSnackbar
        open={openErr}
        handleClose={handleCloseErr}
        errMessage={errMessage}
      />
    </div>
  );
}

export default AddData;
