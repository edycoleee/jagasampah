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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "./ContextData";
import Pagination from "../../components/Pagination";

function PilihData() {
  const { users } = useContext(AuthContext);
  const { getDataBank, setIdBank, nmBank, setNmBank,alamatBank, setAlamatBank,setPengepul } = useContext(
    DataContext
  );
  const [c_cari, setCari] = useState("");
  const [databank, setDataBank] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  //State Portal------------------------------
  const [openPortal, setOpenPortal] = useState(false);

  const onOpenDialog = async () => {
    if (databank.length === 0) {
      await getDataBank()
        .then((data) => setDataBank(data))
        .then(() => setOpenPortal(true))
        .catch((error) => console.error("Error Get Data :", error));
    } else {
      setOpenPortal(true);
    }
  };

  useEffect(() => {
    let filterdata = databank.filter((data) =>
      data.c_nama.toLowerCase().includes(c_cari.toLowerCase())
    );
    //console.log("Filter :", filterdata);
    setDataFilter(filterdata);
    setCurrentPage(1);
  }, [c_cari, databank]);

  const handleClose = () => {
    setOpenPortal(false);
  };

  const onPilihCari = (id, nama, alamat,pengepul) => {
    //console.log(id, c_nama);
    setNmBank(nama);
    setAlamatBank(alamat)
    setIdBank(id);
    setCari("");
    setCurrentPage(1);
    handleClose();
    setPengepul(pengepul)
  };

  //Batal Simpan----------------------------
  const onBatal = () => {
    setNmBank(users.c_defBankName);
    setIdBank(users.c_defBankID);
    setAlamatBank(users.c_defBankAlamat)
    setCari("");
    setCurrentPage(1);
    handleClose()
  };

  // Get current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = dataFilter.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Paper elevation={2}>
        <Box pt={2} pb={2} ml={2} mr={2}>
          <Grid container spacing={3}>
            <Box mt={2} />
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                BankSampah :{users.c_defBankName} {users.c_defBankAlamat}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>
                Ganti Lokasi : {nmBank}
                <p></p> {alamatBank}
              </label>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={onOpenDialog}
                variant="contained"
                color="primary"
                disabled={users.c_tipeuser === "admin" ? false : true}
              >
                CARI
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      {/* -----------------------Dialog Add------------------------ */}
      <Dialog open={openPortal} onClose={handleClose} maxWidth={"md"}>
        <DialogTitle id="alert-dialog-title">Pilih Data </DialogTitle>
        <Box ml={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="c_cari"
                name="c_cari"
                label="Cari Nama"
                fullWidth
                autoComplete="c_cari"
                onChange={(e) => setCari(e.target.value)}
                value={c_cari || ""}
              />
            </Grid>
          </Grid>
        </Box>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          <TableContainer component={Paper}>
            <Table aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">ACTION</TableCell>
                  <TableCell align="left">Nama</TableCell>
                  <TableCell align="left">Alamat</TableCell>
                  <TableCell align="left">Tempat</TableCell>
                  <TableCell align="left">Kecamatan</TableCell>
                  <TableCell align="left">Pengepul</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentPosts.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">
                      <Button
                        onClick={() =>
                          onPilihCari(row.id, row.c_nama, row.c_alamat,row.c_pengepul)
                        }
                        variant="contained"
                        color="primary"
                      >
                        PILIH
                      </Button>
                    </TableCell>
                    <TableCell align="left">{row.c_nama}</TableCell>
                    <TableCell align="left">{row.c_alamat}</TableCell>
                    <TableCell align="left">{row.c_tempat}</TableCell>
                    <TableCell align="left">{row.c_kecamatan}</TableCell>
                    <TableCell>{row.c_pengepul ? "pengepul": "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={dataFilter.length}
          paginate={paginate}
        />
        <DialogActions>
          <Button onClick={onBatal} variant="contained" color="primary">
            BATAL
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PilihData;
