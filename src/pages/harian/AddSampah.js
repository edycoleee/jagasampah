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
import { CL_TPA } from "../../util/dbschema";
import { AuthContext } from "../../context/AuthContext";
import AlertSnackbar from "../../components/AlertSnackbar";
import { SampahContext } from "./ContextSampah";
import { Autocomplete } from "@material-ui/lab";

function AddSampah() {
  const { users } = useContext(AuthContext);
  const {
    SaveData,
    GetDataTgl,
    c_tanggal,
    setTanggal,
    GetDriver,
    dataDriver,
  } = useContext(SampahContext);

  //State Sampah----------------------------
  const [c_driver, setDriver] = useState("");
  const [c_tpa, setTPA] = useState(users.c_defTPA);
  const [c_nopol, setNopol] = useState("");
  const [c_kendaraan, setKendaraan] = useState("");
  const [c_jenis, setJenis] = useState("");
  const [c_fkali, setFKali] = useState(1);
  const [c_asal, setAsal] = useState("");
  const [n_jmlrit, setJmlRit] = useState(0);
  const [n_volm3, setVolM3] = useState(0);
  const [n_volton, setVolTon] = useState(0);
  const [b_save, setBSave] = useState(false);
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
  const onSimpan = async () => {
    //console.log("Simpan Data");
    const onValid = (code, message) => {
      setErrMessage({
        code,
        message,
      });
      setOpenErr(true);
    };

    if (c_nopol === "") {
      return onValid("ERROR", "No Kendaraan Kosong");
    }
    if (c_driver === "") {
      return onValid("ERROR", "Nama Driver Kosong");
    }
    if (c_asal === "") {
      return onValid("ERROR", "Asal Sampah Kosong");
    }
    if (c_kendaraan === "") {
      return onValid("ERROR", "Jenis Kendaraan Tidak Ada");
    }
    if (n_jmlrit === 0) {
      return onValid("ERROR", "Masukkan Jumlah RIT");
    }

    let tgl = new Date(c_tanggal);
    let tahun = String(tgl.getFullYear());
    let bulan = String(tgl.getMonth() + 1);
    if (bulan < 10) bulan = "0" + bulan;
    
    const newData = {
      c_tpa,
      c_tanggal,
      c_driver,
      c_nopol,
      c_asal,
      c_jenis,
      c_kendaraan,
      c_fkali,
      n_jmlrit,
      n_volm3,
      n_volton,
      c_bulan: bulan,
      c_tahun: tahun,
      c_user: users.c_username,
    };
    setBSave(true);
    return await SaveData(newData).then(() => {
      setErrMessage({
        code: "SUCCESS",
        message: "Data Sudah Tersimpan",
      });
      setOpenErr(true);
      setBSave(false);
      ClearState();
      handleClose();
    });
  };

  //Default TPA--------------------------------
  useEffect(() => {
    setTPA(users.c_defTPA);
  }, [users.c_defTPA]);

  //Option TPA-----------------------------------
  let pilihTPA = CL_TPA;
  pilihTPA = pilihTPA.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  //GetDriver--------------------------------
  useEffect(() => {
    GetDriver();
  }, [GetDriver]);

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
    setJenis("");
    setAsal("");
    setKendaraan("");
    setJmlRit(0);
    setVolM3(0);
    setVolTon(0);
    setFKali(0);
  };

  const onCariData = () => {
    GetDataTgl(c_tanggal, c_tpa);
  };

  const onChangeValue = (event, value) => {
    //Desctructuring Searching
    const result = dataDriver.find(({ c_nopol }) => c_nopol === value);
    //console.log("hasilnya destructuring", result);
    if (result) {
      setDriver(result.c_driver);
      setNopol(result.c_nopol);
      setJenis(result.c_jenis);
      setKendaraan(result.c_kendaraan);
      setFKali(result.c_fkali);
    } else {
      setDriver("");
      setNopol("");
      setJenis("");
      setKendaraan("");
    }
  };

  return (
    <div>
      <Paper elevation={2}>
        <Box pt={2} pb={2} ml={2} mr={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <label>Lokasi TPA : {"  "}</label>
              <select
                id="c_defTPA"
                onChange={(e) => setTPA(e.currentTarget.value)}
                value={c_tpa || ""}
                //disabled={!editing}
              >
                {pilihTPA}
              </select>
            </Grid>
            <Grid item xs={12} sm={6}>
              Tanggal :
              <input
                name="c_tanggal"
                placeholder="dd-mm-yyyy"
                value={c_tanggal}
                type="date"
                onChange={(e) => setTanggal(e.target.value)}
                //disabled={!editing}
              />
            </Grid>
            <Box mt={2} />
            <Grid item xs={12} sm={6}>
              <Button
                onClick={onOpenDialog}
                variant="contained"
                color="primary"
              >
                TAMBAH DATA
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button onClick={onCariData} variant="contained" color="primary">
                CARI DATA
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
              <Autocomplete
                id="cobafree"
                freeSolo
                options={dataDriver.map((option) => option.c_nopol)}
                onChange={onChangeValue}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="No Kendaraan"
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => setNopol(e.target.value)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="c_driver"
                name="c_driver"
                label="Nama Driver"
                fullWidth
                autoComplete="driver"
                onChange={(e) => setDriver(e.target.value)}
                value={c_driver || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="c_kendaraan"
                name="c_kendaraan"
                label="Jenis Kendaraan"
                fullWidth
                autoComplete="c_kendaraan"
                onChange={(e) => setKendaraan(e.target.value)}
                value={c_kendaraan || ""}
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
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="c_asal"
                name="c_asal"
                label="Asal Sampah"
                fullWidth
                autoComplete="c_asal"
                onChange={(e) => setAsal(e.target.value)}
                value={c_asal || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="n_jmlrit"
                name="n_jmlrit"
                label="Volume (Rit)"
                type="number"
                fullWidth
                autoComplete="n_jmlrit"
                onChange={(e) => {
                  setJmlRit(e.target.value);
                  setVolM3(e.target.value * c_fkali);
                  setVolTon(e.target.value * c_fkali * 0.33);
                }}
                value={n_jmlrit || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="c_fkali"
                name="c_fkali"
                label="Faktor Kali"
                type="number"
                fullWidth
                autoComplete="c_fkali"
                onChange={(e) => setFKali(e.target.value)}
                value={c_fkali || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="n_volm3"
                name="n_volm3"
                label="Volume (M3)"
                type="number"
                fullWidth
                autoComplete="n_volm3"
                onChange={(e) => setVolM3(e.target.value)}
                value={n_volm3 || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="n_volton"
                name="n_volton"
                label="Volume (Ton)"
                type="number"
                fullWidth
                autoComplete="n_volton"
                onChange={(e) => setVolTon(e.target.value)}
                value={n_volton || ""}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onBatal}
            disabled={b_save}
            variant="contained"
            color="primary"
          >
            BATAL
          </Button>
          <Button
            onClick={onSimpan}
            disabled={b_save}
            variant="contained"
            color="primary"
          >
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

export default AddSampah;
