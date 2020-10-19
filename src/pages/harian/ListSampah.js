import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { SampahContext } from "./ContextSampah";
import EditSampah from "./EditSampah";

function ListSampah() {
  const { dataSampah, GetData, DeleteData } = useContext(SampahContext);

  //edit item
  const [currentItem, setCurrentItem] = useState([]);
  const [openDlg, setOpenDlg] = useState(false);
  const openUpdateDialog = (data) => {
    setOpenDlg(true);
    editItem(data);
  };

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

  return (
    <div>
      <Paper elevation={2}>
        <Box pt={2} pb={2} ml={2} mr={2}>
          <h4>List Sampah</h4>
          Tot Rit : {RitRit}, Tot M3 : {M3M3}, Tot Ton : {TotTon}
          <TableContainer component={Paper}>
            <Table aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Tanggal</TableCell>
                  <TableCell align="right">Driver</TableCell>
                  <TableCell align="right">Nopol</TableCell>
                  <TableCell align="right">Kendrn</TableCell>
                  <TableCell align="right">Jenis</TableCell>
                  <TableCell align="right">Asal</TableCell>
                  <TableCell align="right">Rit</TableCell>
                  <TableCell align="right">M3</TableCell>
                  <TableCell align="right">TON</TableCell>
                  <TableCell align="right">TPA</TableCell>
                  <TableCell align="right">ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataSampah.map((row) => (
                  <TableRow key={row.Id}>
                    <TableCell component="th" scope="row">
                      {row.c_tanggal}
                    </TableCell>
                    <TableCell align="right">{row.c_driver}</TableCell>
                    <TableCell align="right">{row.c_nopol}</TableCell>
                    <TableCell align="right">{row.c_kendaraan}</TableCell>
                    <TableCell align="right">{row.c_jenis}</TableCell>
                    <TableCell align="right">{row.c_asal}</TableCell>
                    <TableCell align="right">{row.n_jmlrit}</TableCell>
                    <TableCell align="right">{row.n_volm3}</TableCell>
                    <TableCell align="right">{row.n_volton}</TableCell>
                    <TableCell align="right">{row.c_tpa}</TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => onDelete(row.Id, row.c_tanggal)}
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
