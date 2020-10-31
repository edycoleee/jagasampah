import {
  Box,
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
import React, { useContext, useEffect, useMemo, useState } from "react";
import { SampahContext } from "./ContextSampah";
import Pagination from "../../components/Pagination";

function ListSampah() {
  const { dataSampah, GetData } = useContext(SampahContext);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [dataFilter, setDataFilter] = useState([]);
  const [c_cari, setCari] = useState("");

  useEffect(() => {
    let filterdata = dataSampah.filter((data) =>
      data.nmBank.toLowerCase().includes(c_cari.toLowerCase())
    );
    //console.log("Filter :", filterdata);
    setDataFilter(filterdata);
    setCurrentPage(1);
  }, [c_cari, dataSampah]);

  useEffect(() => {
    GetData();
  }, [GetData]);

  const calcPlastic = (dataSampah) => {
    return dataSampah.reduce((total, item) => {
      const volrit = parseFloat(item.n_plastik);
      return total + volrit;
    }, 0);
  };
  const jmlPlastik = useMemo(() => calcPlastic(dataFilter), [dataFilter]);

  const calcOrganik = (dataSampah) => {
    return dataSampah.reduce((total, item) => {
      const volm3 = parseFloat(item.n_organik);
      //console.log(volm3);
      return total + volm3;
    }, 0);
  };
  const jmlOrganik = useMemo(() => calcOrganik(dataFilter), [dataFilter]);

  const calcKertas = (dataSampah) => {
    return dataSampah.reduce((total, item) => {
      const volm3 = parseFloat(item.n_kertas);
      //console.log(volm3);
      return total + volm3;
    }, 0);
  };
  const jmlKertas = useMemo(() => calcKertas(dataFilter), [dataFilter]);

  const calcKaca = (dataSampah) => {
    return dataSampah.reduce((total, item) => {
      const volm3 = parseFloat(item.n_kaca);
      //console.log(volm3);
      return total + volm3;
    }, 0);
  };
  const jmlKaca = useMemo(() => calcKaca(dataFilter), [dataFilter]);

  const calcKaret = (dataSampah) => {
    return dataSampah.reduce((total, item) => {
      const volm3 = parseFloat(item.n_karet);
      //console.log(volm3);
      return total + volm3;
    }, 0);
  };
  const jmlKaret = useMemo(() => calcKaret(dataFilter), [dataFilter]);

  const calcKayu = (dataSampah) => {
    return dataSampah.reduce((total, item) => {
      const volm3 = parseFloat(item.n_kayu);
      //console.log(volm3);
      return total + volm3;
    }, 0);
  };
  const jmlKayu = useMemo(() => calcKayu(dataFilter), [dataFilter]);

  const calcLain = (dataSampah) => {
    return dataSampah.reduce((total, item) => {
      const volm3 = parseFloat(item.n_lain);
      //console.log(volm3);
      return total + volm3;
    }, 0);
  };
  const jmlLain = useMemo(() => calcLain(dataFilter), [dataFilter]);

  const TotTon =
    jmlPlastik +
    jmlOrganik +
    jmlKertas +
    jmlKaca +
    jmlKaret +
    jmlKayu +
    jmlLain;

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
          <Typography variant="subtitle1" gutterBottom>
            Data Sampah : {dataSampah.length} data,<p></p> TOTAL(KG) => Plastik :{" "}
            {jmlPlastik}, Organik : {jmlOrganik}, Kertas : {jmlKertas},Kaca :{" "}
            {jmlKaca}, Karet : {jmlKaret}, Kayu : {jmlKayu}, Lainnya : {jmlLain}
          </Typography>

          <Typography variant="h1" component="h2" gutterBottom>
            TOTAL : {TotTon.toFixed(2)} KG
          </Typography>
          <p></p>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="c_cari"
              name="c_cari"
              label="CARI NAMA"
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
                  <TableCell align="right">Nama</TableCell>
                  <TableCell align="right">Jenis</TableCell>
                  <TableCell align="right">Plastik</TableCell>
                  <TableCell align="right">Organik</TableCell>
                  <TableCell align="right">Kertas</TableCell>
                  <TableCell align="right">Kaca</TableCell>
                  <TableCell align="right">Karet</TableCell>
                  <TableCell align="right">Kayu</TableCell>
                  <TableCell align="right">Lainnya</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData.map((row) => (
                  <TableRow key={row.Id}>
                    <TableCell component="th" scope="row">
                      {row.c_tanggal}
                    </TableCell>
                    <TableCell align="right">{row.nmBank}</TableCell>
                    <TableCell>{row.pengepul ? "pengepul": "bank sampah"}</TableCell>
                    <TableCell align="right">{row.n_plastik}</TableCell>
                    <TableCell align="right">{row.n_organik}</TableCell>
                    <TableCell align="right">{row.n_kertas}</TableCell>
                    <TableCell align="right">{row.n_kaca}</TableCell>
                    <TableCell align="right">{row.n_karet}</TableCell>
                    <TableCell align="right">{row.n_kayu}</TableCell>
                    <TableCell align="right">{row.n_lain}</TableCell>
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
    </div>
  );
}

export default ListSampah;
