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
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "./ContextData";
import EditData from "./EditData";
import Pagination from "../../components/Pagination";

function ListData() {
  const { dataAwal, GetAllData, DeleteData } = useContext(DataContext);
  const { users } = useContext(AuthContext);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [c_cari, setCari] = useState("");
  const [dataFilter, setDataFilter] = useState([]);
  //edit item
  const [currentItem, setCurrentItem] = useState([]);
  const [openDlg, setOpenDlg] = useState(false);
  const openUpdateDialog = (data) => {
    setOpenDlg(true);
    editItem(data);
  };

  useEffect(() => {
    GetAllData();
  }, [GetAllData]);

  useEffect(() => {
    let filterdata = dataAwal.filter((data) =>
      data.c_nopol.toLowerCase().includes(c_cari.toLowerCase())
    );
    //console.log("Filter :", filterdata);
    setDataFilter(filterdata);
    setCurrentPage(1);
  }, [c_cari, dataAwal]);

  const handleClose = () => {
    setOpenDlg(false);
  };

  const editItem = (data) => {
    setCurrentItem({ ...data });
  };

  const onDelete = (id) => {
    //console.log(id);
    DeleteData(id);
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
          <h4>List Driver</h4>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="c_cari"
              name="c_cari"
              label="CARI NOPOL"
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
                  <TableCell>NOPOL</TableCell>
                  <TableCell>Driver</TableCell>
                  <TableCell>Kendaraan</TableCell>
                  <TableCell>Asal</TableCell>
                  <TableCell>FKali</TableCell>
                  <TableCell>ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.c_driver}
                    </TableCell>
                    <TableCell>{row.c_nopol}</TableCell>
                    <TableCell>{row.c_kendaraan}</TableCell>
                    <TableCell>{row.c_jenis}</TableCell>
                    <TableCell>{row.c_fkali}</TableCell>
                    <TableCell>
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
