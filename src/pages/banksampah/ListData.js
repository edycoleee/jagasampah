import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "./ContextData";
import EditData from "./EditData";
import Pagination from "../../components/Pagination";
import { AuthContext } from "../../context/AuthContext";

function ListData() {
  const { dataAwal, GetAllData, DeleteData } = useContext(DataContext);
  const { users } = useContext(AuthContext);
  const [c_cari, setCari] = useState("");
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [dataFilter, setDataFilter] = useState([]);

  //edit item
  const [currentItem, setCurrentItem] = useState([]);
  const [openDlg, setOpenDlg] = useState(false);
  const openUpdateDialog = (data) => {
    setOpenDlg(true);
    editItem(data);
  };

  useEffect(() => {
    let filterdata = dataAwal.filter((data) =>
      data.c_nama.toLowerCase().includes(c_cari.toLowerCase())
    );
    //console.log("Filter :", filterdata);
    setDataFilter(filterdata);
    setCurrentPage(1);
  }, [c_cari, dataAwal]);

  useEffect(() => {
    GetAllData();
  }, [GetAllData]);

  const handleClose = () => {
    setOpenDlg(false);
  };

  const editItem = (data) => {
    setCurrentItem({ ...data });
  };

  const onDelete = (id, tgl) => {
    //console.log(id, tgl);
    DeleteData(id, tgl);
  };

  // Get current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentData = dataFilter.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Paper elevation={2}>
        <Box pt={2} pb={2} ml={2} mr={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="c_cari"
              name="c_cari"
              label="CARI KECAMATAN"
              fullWidth
              autoComplete="c_cari"
              onChange={(e) => setCari(e.target.value)}
              value={c_cari || ""}
            />
          </Grid>
          <TableContainer component={Paper}>
            <Table aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell align="right">Nama</TableCell>
                  <TableCell align="right">Alamat</TableCell>
                  <TableCell align="right">Tempat</TableCell>
                  <TableCell align="right">Kecamatan</TableCell>
                  <TableCell align="right">Desa</TableCell>
                  <TableCell align="right">SKPenetapan</TableCell>
                  <TableCell align="right">Pengelola</TableCell>
                  <TableCell align="right">ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.c_user}
                    </TableCell>
                    <TableCell align="right">{row.c_nama}</TableCell>
                    <TableCell align="right">{row.c_alamat}</TableCell>
                    <TableCell align="right">{row.c_tempat}</TableCell>
                    <TableCell align="right">{row.c_kecamatan}</TableCell>
                    <TableCell align="right">{row.c_desa}</TableCell>
                    <TableCell align="right">{row.c_Sktetap}</TableCell>
                    <TableCell align="right">{row.c_pengelola}</TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => onDelete(row.id)}
                        variant="contained"
                        color="primary"
                        disabled={users.c_tipeuser === "admin" ? false : true}
                      >
                        DEL
                      </Button>
                      <Box mt={1} />
                      <Button
                        onClick={() => openUpdateDialog(row)}
                        variant="contained"
                        color="primary"
                        disabled={users.c_tipeuser === "admin" ? false : true}
                      >
                        EDT
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={dataFilter.length}
          paginate={paginate}
        />
      </Paper>
      <EditData
        open={openDlg}
        handleClose={handleClose}
        currentItem={currentItem}
      />
    </div>
  );
}

export default ListData;
