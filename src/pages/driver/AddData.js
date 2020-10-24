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
import { CL_JNSKENDARAAN } from "../../util/dbschema";
import { Autocomplete } from "@material-ui/lab";
import { Develop } from "../../util/firebase";

function AddData() {
  const { users } = useContext(AuthContext);
  const { SaveData, AddDummyData } = useContext(DataContext);

  //State Sampah----------------------------
  const [c_driver, setDriver] = useState("");
  const [c_nopol, setNopol] = useState("");
  const [c_fkali, setFKali] = useState(1);
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

  const onChangeValue = (event, value) => {
    //Desctructuring Searching
    const result = CL_JNSKENDARAAN.find(({ kendaraan }) => kendaraan === value);
    if (result) {
      setFKali(result.fkali);
      setKendaraan(result.kendaraan);
    } else {
      setFKali(1);
    }
  };

  const handleClose = () => {
    setOpenPortal(false);
  };
  //Simpan Data------------------------------
  const onSimpan = async () => {
    const onValid = (code, message) => {
      setErrMessage({
        code,
        message,
      });
      setOpenErr(true);
    };
    if (c_driver === "") {
      return onValid("ERROR", "ISILAH NAMA DRIVER");
    }
    if (c_nopol === "") {
      return onValid("ERROR", "ISILAH NOMOR KENDARAAN");
    }
    if (c_kendaraan === "") {
      return onValid("ERROR", "ISILAH JENIS KENDARAAN");
    }
    if (c_fkali === 0) {
      return onValid("ERROR", "ISILAH FAKTOR KALI / 1");
    }
    const newData = {
      c_driver,
      c_nopol,
      c_kendaraan,
      c_jenis,
      c_fkali,
      c_user: users.c_username,
    };

    return await SaveData(newData).then(() => {
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
    setDriver("");
    setNopol("");
    setKendaraan("");
    setJenis("");
    setFKali(1);
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
                TAMBAH DATA
              </Button>
            </Grid>
            {/* ----------------Uploud Dummy Data */}
            {Develop ? (
              <Grid item xs={12} sm={6}>
                <Button
                  onClick={() => AddDummyData()}
                  variant="contained"
                  color="primary"
                  //disabled={true}
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
                id="c_nopol"
                name="c_nopol"
                label="No Polisi"
                fullWidth
                autoComplete="c_nopol"
                onChange={(e) => setNopol(e.target.value)}
                value={c_nopol || ""}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <label>Lokasi TPA : {"  "}</label>
              <select
                id="c_kendaraan"
                onChange={(e) => setKendaraan(e.currentTarget.value)}
                value={c_kendaraan || ""}
              >
                {pilihJNS}
              </select>
            </Grid> */}

            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="cobafree"
                freeSolo
                options={CL_JNSKENDARAAN.map((option) => option.kendaraan)}
                onChange={onChangeValue}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="JENIS KENDARAAN"
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => setKendaraan(e.target.value)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="c_fkali"
                name="c_fkali"
                type="number"
                label="Faktor Kali"
                fullWidth
                autoComplete="c_fkali"
                onChange={(e) => setFKali(e.target.value)}
                value={c_fkali || ""}
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
