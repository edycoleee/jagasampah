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
import React, { useContext, useMemo } from "react";
import { Develop } from "../../util/firebase";
import ChartSampah from "./ChartSampah";
import { SampahContext } from "./ContextSampah";

function ListSampah() {
  const { dataBulanan } = useContext(SampahContext);

  const calcTon = (dataSampah) => {
    return dataSampah.reduce((total, item) => {
      const volton = parseFloat(item.n_volton);
      return total + volton;
    }, 0);
  };

  const TotTon = useMemo(() => calcTon(dataBulanan), [dataBulanan]);

  return (
    <div>
      <Paper elevation={2}>
        <Box pt={2} pb={2} ml={2} mr={2}>
        {dataBulanan[0] && <ChartSampah />}
        </Box>
        </Paper>
        <Box mt={2} />
      <Paper elevation={2}>
        <Box pt={2} pb={2} ml={2} mr={2}>
          <Typography variant="h5" gutterBottom>
            Data Sampah : {dataBulanan.length} data,
          </Typography>
          { Develop && JSON.stringify(dataBulanan) }
          <Typography variant="h1" component="h2" gutterBottom>
            TOTAL : {TotTon.toFixed(2)} KG
          </Typography>
          <p></p>
          <TableContainer component={Paper}>
            <Table aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Tanggal</TableCell>
                  <TableCell align="right">Plastik</TableCell>
                  <TableCell align="right">Organik</TableCell>
                  <TableCell align="right">Kertas</TableCell>
                  <TableCell align="right">Kaca</TableCell>
                  <TableCell align="right">Karet</TableCell>
                  <TableCell align="right">Kayu</TableCell>
                  <TableCell align="right">Lainnya</TableCell>
                  <TableCell align="right">TOTAL</TableCell>
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
                          <TableCell align="right">{row.n_plastik}</TableCell>
                          <TableCell align="right">{row.n_organik}</TableCell>
                          <TableCell align="right">{row.n_kertas}</TableCell>
                          <TableCell align="right">{row.n_kaca}</TableCell>
                          <TableCell align="right">{row.n_karet}</TableCell>
                          <TableCell align="right">{row.n_kayu}</TableCell>
                          <TableCell align="right">{row.n_lain}</TableCell>
                          <TableCell align="right">
                            {parseFloat(n_volton).toFixed(2)}
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
