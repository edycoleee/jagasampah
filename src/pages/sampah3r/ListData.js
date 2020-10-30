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
import { DataContext } from "./ContextData";
import EditData from "./EditData";
import { AuthContext } from "../../context/AuthContext";

function ListData() {
  const { users } = useContext(AuthContext);
  const {
    dataAwal,
    DeleteData,
    GetDataFTgl,
    c_tanggal,
    GetDataFTglAdmin,
  } = useContext(DataContext);

  //edit item
  const [currentItem, setCurrentItem] = useState([]);
  const [openDlg, setOpenDlg] = useState(false);
  const openUpdateDialog = (data) => {
    setOpenDlg(true);
    editItem(data);
  };

  useEffect(() => {
    //GetDataFTgl(c_tanggal,users.c_defBankID);
    if (users.c_tipeuser === "admin") {
      console.log("ADMIN", users.c_tipeuser);
      GetDataFTglAdmin(c_tanggal);
    } else {
      console.log("NO ADMIN", users.c_tipeuser);
      GetDataFTgl(c_tanggal, users.c_defBankID);
    }
  }, [GetDataFTgl, c_tanggal, users.c_defBankID]);

  const calcPlastik = (dataAwal) => {
    return dataAwal.reduce((total, item) => {
      const volplastik = parseInt(item.n_plastik);
      return total + volplastik;
    }, 0);
  };
  const totPlastik = useMemo(() => calcPlastik(dataAwal), [dataAwal]);

  const calcOrganik = (dataAwal) => {
    return dataAwal.reduce((total, item) => {
      const volorganik = parseInt(item.n_organik);
      return total + volorganik;
    }, 0);
  };
  const totOrganik = useMemo(() => calcOrganik(dataAwal), [dataAwal]);

  const calcKertas = (dataAwal) => {
    return dataAwal.reduce((total, item) => {
      const volKertas = parseInt(item.n_kertas);
      return total + volKertas;
    }, 0);
  };
  const totKertas = useMemo(() => calcKertas(dataAwal), [dataAwal]);

  const calcKaca = (dataAwal) => {
    return dataAwal.reduce((total, item) => {
      const volKaca = parseInt(item.n_kaca);
      return total + volKaca;
    }, 0);
  };
  const totKaca = useMemo(() => calcKaca(dataAwal), [dataAwal]);

  const calcKaret = (dataAwal) => {
    return dataAwal.reduce((total, item) => {
      const volKaret = parseInt(item.n_karet);
      return total + volKaret;
    }, 0);
  };
  const totKaret = useMemo(() => calcKaret(dataAwal), [dataAwal]);

  const calcKayu = (dataAwal) => {
    return dataAwal.reduce((total, item) => {
      const volKayu = parseInt(item.n_kayu);
      return total + volKayu;
    }, 0);
  };
  const totKayu = useMemo(() => calcKayu(dataAwal), [dataAwal]);

  const calcLain = (dataAwal) => {
    return dataAwal.reduce((total, item) => {
      const volLain = parseInt(item.n_lain);
      return total + volLain;
    }, 0);
  };
  const totLain = useMemo(() => calcLain(dataAwal), [dataAwal]);

  const TOTAL =
    totPlastik +
    totOrganik +
    totKertas +
    totKaca +
    totKaret +
    totKayu +
    totLain;

  const handleClose = () => {
    setOpenDlg(false);
  };

  const editItem = (data) => {
    setCurrentItem({ ...data });
  };

  const onDelete = (id, tgl, idBank) => {
    DeleteData(id, tgl, idBank);
  };

  return (
    <div>
      <Paper elevation={2}>
        <Box pt={2} pb={2} ml={2} mr={2}>
          <h4>
            List Sampah :
            {dataAwal.length === 0
              ? "DATA TIDAK ADA"
              : `${dataAwal.length} Data`}
          </h4>
          TOTAL : {TOTAL}, PLASTIK : {totPlastik}, ORGANIK : {totOrganik},
          KERTAS : {totKertas}
          KACA : {totKaca}, KARET : {totKaret}, KAYU : {totKayu}, LAINNYA :{" "}
          {totLain}
          <TableContainer component={Paper}>
            <Table aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>PENGELOLA</TableCell>
                  <TableCell align="right">PLASTIK</TableCell>
                  <TableCell align="right">ORGANIK</TableCell>
                  <TableCell align="right">KERTAS</TableCell>
                  <TableCell align="right">KACA</TableCell>
                  <TableCell align="right">KARET</TableCell>
                  <TableCell align="right">KAYU</TableCell>
                  <TableCell align="right">LAINNYA</TableCell>
                  <TableCell align="right">DELETE</TableCell>
                  <TableCell align="right">EDIT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataAwal.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.nmBank}
                    </TableCell>
                    <TableCell align="right">{row.n_plastik}</TableCell>
                    <TableCell align="right">{row.n_organik}</TableCell>
                    <TableCell align="right">{row.n_kertas}</TableCell>
                    <TableCell align="right">{row.n_kaca}</TableCell>
                    <TableCell align="right">{row.n_karet}</TableCell>
                    <TableCell align="right">{row.n_kayu}</TableCell>
                    <TableCell align="right">{row.n_lain}</TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() =>
                          onDelete(row.id, row.c_tanggal, row.idBank)
                        }
                        variant="contained"
                        color="secondary"
                      >
                        DEL
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => openUpdateDialog(row)}
                        variant="contained"
                        color="default"
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
      <EditData
        open={openDlg}
        handleClose={handleClose}
        currentItem={currentItem}
      />
    </div>
  );
}

export default ListData;
