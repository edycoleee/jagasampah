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
import React, { useContext, useEffect, useMemo, useState } from "react";
import { SampahContext } from "./ContextSampah";
import EditSampah from "./EditSampah";
import Pagination from "../../components/Pagination";

function ListSampah() {
  const { dataSampah, GetData, DeleteData } = useContext(SampahContext);

  //edit item
  const [currentItem, setCurrentItem] = useState([]);
  const [openDlg, setOpenDlg] = useState(false);
  const openUpdateDialog = (data) => {
    setOpenDlg(true);
    editItem(data);
  };

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [dataFilter, setDataFilter] = useState([]);
  const [c_cari, setCari] = useState("");

  useEffect(() => {
    let filterdata = dataSampah.filter((data) =>
      data.c_nopol.toLowerCase().includes(c_cari.toLowerCase())
    );
    //console.log("Filter :", filterdata);
    setDataFilter(filterdata);
    setCurrentPage(1);
  }, [c_cari, dataSampah]);

  useEffect(() => {
    GetData();
  }, [GetData]);

  const calcTon = (dataSampah) => {
    return dataSampah.reduce((total, item) => {
      const volton = parseFloat(item.n_volton);
      return total + volton;
    }, 0);
  };

  const TotTon = useMemo(() => calcTon(dataSampah), [dataSampah]);

  const calcRit = (dataSampah) => {
    return dataSampah.reduce((total, item) => {
      const volrit = parseFloat(item.n_jmlrit);
      return total + volrit;
    }, 0);
  };

  const RitRit = useMemo(() => calcRit(dataSampah), [dataSampah]);

  const calcM3 = (dataSampah) => {
    return dataSampah.reduce((total, item) => {
      const volm3 = parseFloat(item.n_volm3);
      //console.log(volm3);
      return total + volm3;
    }, 0);
  };

  const M3M3 = useMemo(() => calcM3(dataSampah), [dataSampah]);

  const handleClose = () => {
    setOpenDlg(false);
  };

  const editItem = (data) => {
    setCurrentItem({ ...data });
  };

  const onDelete = (id, tgl) => {
    console.log(id, tgl);
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
          <h4>List Sampah : {dataSampah.length} data</h4>
          Tot Rit : {RitRit}, Tot M3 : {M3M3}, Tot Ton : {TotTon.toFixed(2)}
          <p></p>
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
                  <TableCell>Tanggal</TableCell>
                  <TableCell>Driver</TableCell>
                  <TableCell>Nomor</TableCell>
                  <TableCell>Kendrn</TableCell>
                  <TableCell>Dinas</TableCell>
                  <TableCell>Asal</TableCell>
                  <TableCell align="right">Rit</TableCell>
                  <TableCell align="right">M3</TableCell>
                  <TableCell align="right">TON</TableCell>
                  <TableCell>TPA</TableCell>
                  <TableCell>ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.c_tanggal}
                    </TableCell>
                    <TableCell>{row.c_driver}</TableCell>
                    <TableCell>{row.c_nopol}</TableCell>
                    <TableCell>{row.c_kendaraan}</TableCell>
                    <TableCell>{row.c_jenis}</TableCell>
                    <TableCell>{row.c_asal}</TableCell>
                    <TableCell align="right">{row.n_jmlrit}</TableCell>
                    <TableCell align="right">{row.n_volm3}</TableCell>
                    <TableCell align="right">{ parseFloat(row.n_volton).toFixed(2)}</TableCell>
                    <TableCell>{row.c_tpa}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => onDelete(row.id, row.c_tanggal)}
                        variant="contained"
                        color="primary"
                      >
                        DEL
                      </Button>
                      <Box mt={1} />
                      <Button
                        onClick={() => openUpdateDialog(row)}
                        variant="contained"
                        color="primary"
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
      <EditSampah
        open={openDlg}
        handleClose={handleClose}
        currentItem={currentItem}
      />
    </div>
  );
}

export default ListSampah;
