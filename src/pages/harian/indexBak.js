import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useContext, useEffect, useState } from "react";
import MenuAppbar from "../../components/MenuAppbar";
import ScrollButton from "../../components/ScrollButton";
import { AuthContext } from "../../context/AuthContext";
import app, { Firebase } from "../../util/firebase";
import AlertSnackbar from "../../components/AlertSnackbar";
import moment from "moment";
import { CL_TPA, CL_TPST } from "../../util/dbschema";

const db = app.firestore();
//setting jika menggunakan emulator firestore
//db.settings({ host: "localhost:8080", ssl: false });

function IndexHarian() {
  const { users, currentUser } = useContext(AuthContext);

  //Init Value
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  var today = year + "-" + month + "-" + day;

  const initSampah = [
    {
      c_bulan: "",
      c_tahun: "",
      d_tanggal: "",
      c_createdAt: "",
      c_tanggal: today,
      c_driver: "",
      c_nopol: "",
      c_jenis: "",
      c_asal: "",
      n_jmlrit: "",
      n_volm3: "",
      n_volton: "",
      c_tpa: users.c_defTPA,
      c_user: users.c_username,
    },
  ];

  const [editing, setEditing] = useState(false);
  const [DtSampahHari, SetDtSampahHari] = useState(initSampah[0]);
  const [CurrentData, SetCurrentData] = useState([]);
  const [tanggalCr, SetTanggalCr] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [openErr, setOpenErr] = useState(false);

  let pilihTPA = CL_TPA;
  pilihTPA = pilihTPA.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  const getDataSampah = useCallback(async (tglserver) => {
    console.log("render effect", tglserver);
    await db
      .collection("CL_SAMPAHHARIAN")
      .where("c_tanggal", "==", tglserver)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("All Data Collection :", data);
        SetCurrentData(data);
      });
  }, []);

  useEffect(() => {
    let tglserver1 = new Date(
      Firebase.firestore.Timestamp.now().seconds * 1000
    );
    let tglserver = moment(tglserver1).format("YYYY-MM-DD");

    getDataSampah(tglserver);
  }, [getDataSampah]);

  const onEdit = () => {
    setEditing(true);
  };

  const onSimpan = async () => {
    let tglserver1 = new Date(
      Firebase.firestore.Timestamp.now().seconds * 1000
    );
    let tglserver = moment(tglserver1).format("YYYY-MM-DD");

    let tgl = new Date(DtSampahHari.c_tanggal);
    let tahun = String(tgl.getFullYear());
    let bulan = String(tgl.getMonth() + 1);
   
    await db
      .collection("CL_SAMPAHHARIAN")
      .add({
        c_createdAt: tglserver,
        c_bulan: bulan,
        c_tahun: tahun,
        c_tanggal: DtSampahHari.c_tanggal,
        c_user: DtSampahHari.c_user,
        c_driver: DtSampahHari.c_driver,
        c_nopol: DtSampahHari.c_nopol,
        c_jenis: DtSampahHari.c_jenis,
        c_asal: DtSampahHari.c_asal,
        n_jmlrit: DtSampahHari.n_jmlrit,
        n_volm3: DtSampahHari.n_volm3,
        n_volton: DtSampahHari.n_volton,
        c_tpa: DtSampahHari.c_tpa,
      })
      .then(() => {
        console.log("Document Saved");
        setEditing(false);
        setErrMessage({
          code: "SUCCESS",
          message: "Data Sudah Tersimpan",
        });
        setOpenErr(true);
        SetDtSampahHari(initSampah[0]);
      })
      .catch((error) => console.error("Error Updated :", error));
  };

  const onBatal = () => {
    setEditing(false);
    SetDtSampahHari(initSampah[0]);
    //getProfile();
  };

  const handleCloseErr = () => {
    setOpenErr(false);
  };

  const onChangeBaru = (e) => {
    const { name, value } = e.target;
    SetDtSampahHari({ ...DtSampahHari, [name]: value });
  };

  return (
    <div>
      <MenuAppbar />
      {JSON.stringify(users)}
      {JSON.stringify(CurrentData)}
      {JSON.stringify(DtSampahHari.c_tanggal)}
      <ScrollButton />
      <Container maxWidth="sm">
        <Box mt={2} />
        <Typography component="h1" variant="h4" align="center">
          Laporan Sampah Harian
        </Typography>
        <Typography variant="h6" align="center">
          {users.c_username}
        </Typography>
        <Box mt={4} />
        {/* --------------------ENTRY DATA SAMPAH-------------------------------- */}
        <Paper elevation={2}>
          <Box mt={1} ml={1} mr={1}>
            <Typography variant="h6" gutterBottom>
              Data Sampah
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <label>Lokasi TPA : {"  "}</label>
                <select
                  id="c_defTPA"
                  onChange={(e) =>
                    SetDtSampahHari({
                      ...DtSampahHari,
                      c_tpa: e.currentTarget.value,
                    })
                  }
                  value={DtSampahHari.c_tpa || ""}
                  disabled={!editing}
                >
                  {pilihTPA}
                </select>
              </Grid>
              <Grid item xs={12} sm={6}>
                Tanggal :
                <input
                  name="c_tanggal"
                  placeholder="dd-mm-yyyy"
                  value={DtSampahHari.c_tanggal}
                  type="date"
                  onChange={onChangeBaru}
                  disabled={!editing}
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
                  disabled={!editing}
                  onChange={onChangeBaru}
                  value={DtSampahHari.c_driver || ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="c_nopol"
                  name="c_nopol"
                  label="Nomor Kendaraan"
                  fullWidth
                  autoComplete="c_nopol"
                  disabled={!editing}
                  onChange={onChangeBaru}
                  value={DtSampahHari.c_nopol || ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="c_jenis"
                  name="c_jenis"
                  label="Jenis Kendaraan"
                  fullWidth
                  autoComplete="c_jenis"
                  disabled={!editing}
                  onChange={onChangeBaru}
                  value={DtSampahHari.c_jenis || ""}
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
                  disabled={!editing}
                  onChange={onChangeBaru}
                  value={DtSampahHari.c_asal || ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="n_jmlrit"
                  name="n_jmlrit"
                  label="Jumlah Rit"
                  type="number"
                  fullWidth
                  autoComplete="n_jmlrit"
                  disabled={!editing}
                  onChange={onChangeBaru}
                  value={DtSampahHari.n_jmlrit || 0}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="n_volm3"
                  name="n_volm3"
                  label="Volume M3"
                  type="number"
                  fullWidth
                  autoComplete="n_volm3"
                  disabled={!editing}
                  onChange={onChangeBaru}
                  value={DtSampahHari.n_volm3 || 0}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="n_volton"
                  name="n_volton"
                  label="Jumlah Ton"
                  type="number"
                  fullWidth
                  autoComplete="n_volton"
                  disabled={!editing}
                  onChange={onChangeBaru}
                  value={DtSampahHari.n_volton || 0}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
        <Box mt={4} />
        {/* --------------------EDIT SIMPAN BATAL ACTION-------------------------- */}
        <Paper elevation={2}>
          <Box pt={2} pb={2} ml={2} mr={2}>
            <Button
              onClick={onEdit}
              variant="contained"
              color="primary"
              disabled={editing}
            >
              TAMBAH DATA
            </Button>{" "}
            <Button
              onClick={onSimpan}
              variant="contained"
              color="primary"
              disabled={!editing}
            >
              SIMPAN
            </Button>{" "}
            <Button
              onClick={onBatal}
              variant="contained"
              color="primary"
              disabled={!editing}
            >
              BATAL
            </Button>
          </Box>
        </Paper>
                  </Container>
        <Box mt={4} />
        {/* -----------------DISPLAY SAMPAH HARI INI----------------------- */}
        <Container maxWidth="md">
        <Paper elevation={2}>
          <Box pt={2} pb={2} ml={2} mr={2}>
            <TableContainer component={Paper}>
              <Table aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Calories</TableCell>
                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {CurrentData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.c_tanggal}
                      </TableCell>
                      <TableCell align="right">{row.c_driver}</TableCell>
                      <TableCell align="right">{row.c_nopol}</TableCell>
                      <TableCell align="right">{row.c_jenis}</TableCell>
                      <TableCell align="right">{row.c_asal}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
        </Container>
      <AlertSnackbar
        open={openErr}
        handleClose={handleCloseErr}
        errMessage={errMessage}
      />
    </div>
  );
}

export default IndexHarian;
