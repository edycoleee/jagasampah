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
import Pagination from "../../components/Pagination"

function PilihData() {
  const { users } = useContext(AuthContext);
  const { getDataBank, idBank, setIdBank, nmBank, setNmBank } = useContext(
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
    console.log("Getdata1");
    await getDataBank()
      .then((data) => setDataBank(data))
      .then(() => setOpenPortal(true))
      .then(() => console.log("Getdata4"))
      .catch((error) => console.error("Error Get Data :", error));
  };

  useEffect(() => {
    let filterdata = databank.filter((data) =>
      data.c_nama.toLowerCase().includes(c_cari.toLowerCase())
    );
    //console.log("Filter :", filterdata);
    setDataFilter(filterdata);
    setCurrentPage(1)
  }, [c_cari, databank]);

  const handleClose = () => {
    setOpenPortal(false);
  };

  const onPilihCari = (id, nama) => {
    //console.log(id, c_nama);
    setNmBank(nama);
    setIdBank(id);
    setCari("")
    setCurrentPage(1)
    handleClose();
  };

  //Batal Simpan----------------------------
  const onBatal = () => {
    setNmBank(users.c_defBankName);
    setIdBank(users.c_defBankID);
    setCari("")
    setCurrentPage(1)
    handleClose();
  };

  // Get current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = dataFilter.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <Paper elevation={2}>
        <Box pt={2} pb={2} ml={2} mr={2}>
          <Grid container spacing={3}>
            <Box mt={2} />
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                BankSampah :{users.c_defBankName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>
                Ganti Lokasi : {idBank}
                <p></p> {nmBank}
              </label>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={onOpenDialog}
                variant="contained"
                color="primary"
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
                label="Cari Data"
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
                  <TableCell align="left">Nama</TableCell>
                  <TableCell align="left">Alamat</TableCell>
                  <TableCell align="left">Tempat</TableCell>
                  <TableCell align="left">Kecamatan</TableCell>
                  <TableCell align="center">ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentPosts.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="left">{row.c_nama}</TableCell>
                    <TableCell align="left">{row.c_alamat}</TableCell>
                    <TableCell align="left">{row.c_tempat}</TableCell>
                    <TableCell align="left">{row.c_kecamatan}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => onPilihCari(row.id, row.c_nama)}
                        variant="contained"
                        color="primary"
                      >
                        PILIH
                      </Button>
                    </TableCell>
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
