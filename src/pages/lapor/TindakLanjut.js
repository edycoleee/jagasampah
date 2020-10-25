import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Link,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "./ContextData";
import { PROSESLAPOR } from "../../util/dbschema";
import Pagination from "../../components/Pagination";
import AlertSnackbar from "../../components/AlertSnackbar";
import { Develop } from "../../util/firebase";
import LeafletMapAll from "./MapAll";

function TindakLanjut() {
  const { users } = useContext(AuthContext);
  const {
    semuaData,
    GetAllData,
    DeleteData,
    SaveEditData,
    simpanFileImg3,
  } = useContext(DataContext);
  const [item, setItem] = useState([]);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [fileImg3, setFileImg3] = useState(null);
  //State SnackBar----------------------------
  const [errMessage, setErrMessage] = useState("");
  const [openErr, setOpenErr] = useState(false);
  //Close SnackBar----------------------------
  const handleCloseErr = () => {
    setOpenErr(false);
  };

  //State Portal------------------------------
  const [openPortal, setOpenPortal] = useState(false);
  const onOpenDialog = () => {
    setOpenPortal(true);
  };

  const handleClose = () => {
    setOpenPortal(false);
  };

  useEffect(() => {
    if (Develop) {
      console.log("STEP : EFFECT GET ALL DATA");
    }
    GetAllData();
  }, [GetAllData]);

  const onFileChangeImg3 = (e) => {
    setFileImg3(e.target.files[0]);
  };

  let pilihProses = PROSESLAPOR;
  pilihProses = pilihProses.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  // Get current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentData = semuaData.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const onSimpanEdit = async () => {
    const errorValid = (code, message) => {
      setErrMessage({ code, message });
      setOpenErr(true);
    };

    const {
      id,
      c_tgljadwal,
      c_ketjadwal,
      c_tgljemput,
      c_ketjemput,
      proses,
    } = item;

    if (c_tgljadwal === "") {
      return errorValid("ERROR", "Tanggal Jadwal Kosong");
    }
    if (c_ketjadwal === "") {
      return errorValid("ERROR", "Keterangan Jadwal Kosong");
    }
    if (c_tgljemput === "") {
      return errorValid("ERROR", "Tanggal Jemput Kosong");
    }
    if (c_ketjemput === "") {
      return errorValid("ERROR", "Keterangan Jemput Kosong");
    }

    if (fileImg3 === null) {
      const file = "";
      if (Develop) {
        console.log(
          "Simpan tanpa foto :",
          id,
          c_tgljadwal,
          c_ketjadwal,
          c_tgljemput,
          c_ketjemput,
          proses
        );
      }
      await SaveEditData(
        id,
        c_tgljadwal,
        c_ketjadwal,
        c_tgljemput,
        c_ketjemput,
        proses,
        file
      )
        .then(() => GetAllData())
        .then(() => {
          setErrMessage({
            code: "SUCCESS",
            message: "Proses Menyimpan Data",
          });
          setOpenErr(true);
        });
    } else {
      if (Develop) {
        console.log("STEP : Simpan tanpa dg foto :", item, fileImg3);
      }
      let file = fileImg3.name;
      await SaveEditData(
        id,
        c_tgljadwal,
        c_ketjadwal,
        c_tgljemput,
        c_ketjemput,
        proses,
        file
      );
      await simpanFileImg3(fileImg3, id)
        .then(() => GetAllData())
        .then(() => {
          setErrMessage({
            code: "SUCCESS",
            message: "Proses Menyimpan Data",
          });
          setOpenErr(true);
        });
    }
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
              <Typography variant="subtitle2" align="center">
                TINDAK LANJUT LAPORAN {" :  "}
                {item.id && item.id}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" align="center">
                {item.id && item.c_tanggal + item.c_user + item.c_lokasi}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={onLihat}
                variant="contained"
                color="primary"
                disabled={currentData.length === 0 ? true : false}
              >
                LIHAT MAP
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={onSimpanEdit}
                variant="contained"
                color="primary"
                disabled={!item.id}
              >
                SIMPAN
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>Proses : {"  "}</label>
              <select
                id="proses"
                onChange={(e) =>
                  setItem({
                    ...item,
                    proses: e.currentTarget.value,
                  })
                }
                value={item.proses || ""}
                //disabled={!editing}
              >
                {pilihProses}
              </select>
            </Grid>
            <Grid item xs={12} sm={6}>
              {" "}
            </Grid>
            <Grid item xs={12} sm={6}>
              {item.c_tgljadwal && item.c_tgljadwal}
              <TextField
                id="c_tgljadwal"
                label={`Tgl Jadwal : `}
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                //disabled={!editing}
                onChange={(e) =>
                  setItem({
                    ...item,
                    c_tgljadwal: String(e.currentTarget.value),
                  })
                }
                defaultValue={item.c_tgljadwal || ""}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="c_ketjadwal"
                name="c_ketjadwal"
                label="Ket Jadwal"
                fullWidth
                autoComplete="c_ketjadwal"
                onChange={handleOnChange}
                value={item.c_ketjadwal || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {item.c_tgljemput && item.c_tgljemput}
              <TextField
                id="c_tgljemput"
                label={`Tgl Jemput : `}
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                //disabled={!editing}
                onChange={(e) =>
                  setItem({
                    ...item,
                    c_tgljemput: String(e.currentTarget.value),
                  })
                }
                defaultValue={item.c_tgljemput || ""}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="c_ketjemput"
                name="c_ketjemput"
                label="Ket Jemput"
                fullWidth
                autoComplete="c_ketjemput"
                onChange={handleOnChange}
                value={item.c_ketjemput || ""}
              />
            </Grid>
            <Grid item xs={12}>
              <input type="file" onChange={onFileChangeImg3} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Gambar 1</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" align="center">
                {item.c_fileImg3 === "" ? (
                  "Belum Ada"
                ) : (
                  <Link
                    href={item.c_fileImg3}
                    onClick={(e) => e.preventDefault}
                  >
                    {item.c_namafile3 ? item.c_namafile3 : ""}
                  </Link>
                )}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      {/* ------------------------------------------PILIH------------------------- */}
      <Paper elevation={2}>
        <Box pt={2} pb={2} ml={2} mr={2}>
          <h4>Data Laporan</h4>
          <TableContainer component={Paper}>
            <Table aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>ACTION</TableCell>
                  <TableCell>Tanggal</TableCell>
                  <TableCell>Proses</TableCell>
                  <TableCell>Lokasi</TableCell>
                  <TableCell>Keterangan</TableCell>
                  <TableCell>Latitute</TableCell>
                  <TableCell>Longitude</TableCell>
                  <TableCell>NoHP</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Gambar1</TableCell>
                  <TableCell>Gambar2</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Button
                        onClick={() => setItem(row)}
                        variant="contained"
                        color="primary"
                        disabled={users.c_tipeuser === "admin" ? false : true}
                      >
                        PILIH
                      </Button>
                      <Box mt={1} />
                      <Button
                        onClick={() => DeleteData(row.id)}
                        variant="contained"
                        color="primary"
                        disabled={users.c_tipeuser === "admin" ? false : true}
                      >
                        DEL
                      </Button>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.c_tanggal}
                    </TableCell>
                    <TableCell>{row.proses}</TableCell>
                    <TableCell>{row.c_lokasi}</TableCell>
                    <TableCell>{row.c_ket}</TableCell>
                    <TableCell>{row.c_lat}</TableCell>
                    <TableCell>{row.c_lon}</TableCell>
                    <TableCell>{row.c_noHP}</TableCell>
                    <TableCell>{row.c_user}</TableCell>
                    <TableCell>
                      {row.c_fileImg1 === "" ? (
                        "Belum Ada"
                      ) : (
                        <Link
                          href={row.c_fileImg1}
                          onClick={(e) => e.preventDefault}
                        >
                          {row.c_namafile1 ? row.c_namafile1 : ""}
                        </Link>
                      )}
                    </TableCell>
                    <TableCell>
                      {row.c_fileImg2 === "" ? (
                        "Belum Ada"
                      ) : (
                        <Link
                          href={row.c_fileImg2}
                          onClick={(e) => e.preventDefault}
                        >
                          {row.c_namafile2 ? row.c_namafile2 : ""}
                        </Link>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={semuaData.length}
          paginate={paginate}
        />
      </Paper>

      {/* -----------------------Dialog Add------------------------ */}
      <Dialog open={openPortal} onClose={handleClose} fullWidth>
        <DialogTitle id="alert-dialog-title">LAPORAN SAMPAH </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>

          <LeafletMapAll />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            BATAL
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

export default TindakLanjut;
