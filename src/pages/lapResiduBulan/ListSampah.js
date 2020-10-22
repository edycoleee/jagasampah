import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useContext, useMemo, useState } from "react";
import ChartSampah from "./ChartSampah";
import { SampahContext } from "./ContextSampah";

function ListSampah() {
  const { dataSampah, dataBulanan } = useContext(SampahContext);


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

  return (
    <div>
      <Paper elevation={2}>
        <Box pt={2} pb={2} ml={2} mr={2}>
        {dataBulanan[0] && <ChartSampah dataBulanan={dataBulanan[0]}/>}
        </Box>
        </Paper>
        <Box mt={2} />
      <Paper elevation={2}>
        <Box pt={2} pb={2} ml={2} mr={2}>
          <Typography variant="h5" gutterBottom>
            Data Sampah : {dataSampah.length} data, TOTAL => Rit : {RitRit}, M3
            : {M3M3}
          </Typography>
          {/* {JSON.stringify(dataBulanan)} */}
          <Typography variant="h1" component="h2" gutterBottom>
            TOTAL : {TotTon.toFixed(2)} TON
          </Typography>
          <p></p>
          <TableContainer component={Paper}>
            <Table aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Tanggal</TableCell>
                  <TableCell align="right">Rit</TableCell>
                  <TableCell align="right">M3</TableCell>
                  <TableCell align="right">TON</TableCell>
                  <TableCell>TPA</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataBulanan[0] &&
                  dataBulanan
                    // .sort(function (a, b) {
                    //   return (
                    //     parseInt(a.c_tanggal.substr(8, 2)) -
                    //     parseInt(b.c_tanggal.substr(8, 2))
                    //   );
                    // })
                    .map((row, index) => {
                      const { n_volton } = row;
                      return (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {row.c_tanggal}
                          </TableCell>
                          <TableCell align="right">{row.n_jmlrit}</TableCell>
                          <TableCell align="right">{row.n_volm3}</TableCell>
                          <TableCell align="right">
                            {n_volton.toFixed(2)}
                          </TableCell>
                          <TableCell>{row.c_tpa}</TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </div>
  );
}

export default ListSampah;
