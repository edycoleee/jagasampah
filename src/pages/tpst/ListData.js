import React, { useContext, useEffect, useState } from "react";
import ConfirmDialog from "../../components/ConfirmDialog";
import Controls from "../../components/controls/Controls";
import Notification from "../../components/Notification";
import Popup from "../../components/Popup";
import EditData from "./EditData";
import { Develop } from "../../util/firebase";
import { DataContext } from "./ContextData";
import Pagination from "../../components/Pagination";
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
} from "@material-ui/core";

//import { Button } from "@material-ui/core";
function ListData() {
  const { semuaData, GetAllData, DeleteData, SaveEditData } = useContext(
    DataContext
  );

  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [dataFilter, setDataFilter] = useState([]);

  const [c_cari, setCari] = useState("");

  useEffect(() => {
    let filterdata = semuaData.filter((data) =>
      data.c_kecamatan.toLowerCase().includes(c_cari.toLowerCase())
    );
    if (Develop) {
      console.log("STEP : LIST EFFECT FILTER", filterdata);
    }
    setDataFilter(filterdata);
    setCurrentPage(1);
  }, [c_cari, semuaData]);

  useEffect(() => {
    if (Develop) {
      console.log("STEP : LIST EFFECT GETDATA");
    }
    GetAllData();
  }, [GetAllData]);

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    DeleteData(id);
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };

  const onSimpanEdit = async (data) => {
    if (Develop) {
      console.log(data);
    }
    await SaveEditData(data);
    setOpenPopup(false);
    setNotify({
      isOpen: true,
      message: "Saved Edit Data",
      type: "success",
    });
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
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
                  <TableCell>Desa</TableCell>
                  <TableCell>Kecamatan</TableCell>
                  <TableCell>Keterangan</TableCell>
                  <TableCell>Kontak</TableCell>
                  <TableCell>No HP</TableCell>
                  <TableCell>Gambar</TableCell>
                  <TableCell>DELETE</TableCell>
                  <TableCell>EDIT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.c_desa}
                    </TableCell>
                    <TableCell>{row.c_kecamatan}</TableCell>
                    <TableCell>{row.c_keterangan}</TableCell>
                    <TableCell>{row.c_kontak}</TableCell>
                    <TableCell>{row.c_noHP}</TableCell>
                    <TableCell>{row.c_namafile1}</TableCell>
                    <TableCell>
                      <Controls.Button
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: "Are you sure to delete this record?",
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              onDelete(row.id);
                            },
                          });
                        }}
                        color="secondary"
                        text="DEL"
                      />
                    </TableCell>
                    <TableCell>
                      <Controls.Button
                        onClick={() => {
                          openInPopup(row);
                        }}
                        text="EDT"
                      />
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

      {/* <h3>Delete Dialog</h3>
      <Controls.Button
        onClick={() => {
          setConfirmDialog({
            isOpen: true,
            title: "Are you sure to delete this record?",
            subTitle: "You can't undo this operation",
            onConfirm: () => {
              onDelete("item.id");
            },
          });
        }}
        color="secondary"
        text="DEL"
      />
      <Controls.Button
        onClick={() => {
          openInPopup("item");
        }}
        text="EDT"
      /> */}

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
      <Popup
        title="EDIT FORM"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EditData dataForEdit={recordForEdit} onSimpanEdit={onSimpanEdit} />
      </Popup>
    </div>
  );
}

export default ListData;
