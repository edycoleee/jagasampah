import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "./ContextData";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";

const EditData = React.memo(({ open, handleClose, currentItem }) => {
  const { SaveEditData } = useContext(DataContext);
  const [item, setItem] = useState(currentItem);
  useEffect(() => {
    //console.log("RENDER effect",currentItem);
    setItem(currentItem);
  }, [currentItem]);


  const onSimpanEdit = () => {
    //console.log(item);
    SaveEditData(item);
    handleClose();
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">Edit data </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description"></DialogContentText>
        {/* {JSON.stringify(item)} */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="c_driver"
              name="c_driver"
              label="Nama Driver"
              fullWidth
              autoComplete="driver"
              onChange={handleOnChange}
              value={item.c_driver || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="c_nopol"
              name="c_nopol"
              label="Nomer Kendaraan"
              fullWidth
              autoComplete="c_nopol"
              onChange={handleOnChange}
              value={item.c_nopol || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="c_kendaraan"
              name="c_kendaraan"
              label="Jenis Kendaraan"
              fullWidth
              autoComplete="c_kendaraan"
              onChange={handleOnChange}
              value={item.c_kendaraan || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="c_jenis"
              name="c_jenis"
              label="Jenis Sampah"
              fullWidth
              autoComplete="c_jenis"
              onChange={handleOnChange}
              value={item.c_jenis || ""}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          BATAL
        </Button>
        <Button onClick={onSimpanEdit} variant="contained" color="primary">
          SIMPAN EDIT
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default EditData;
