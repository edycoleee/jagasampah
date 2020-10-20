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
    console.log(item, currentItem.id);
    SaveEditData(item, currentItem.id);
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
            Tanggal :
            <input
              name="c_tanggal"
              placeholder="dd-mm-yyyy"
              value={item.c_tanggal}
              type="date"
              onChange={handleOnChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="n_plastik"
              name="n_plastik"
              label="Plastik (kg)"
              type="number"
              fullWidth
              autoComplete="n_plastik"
              onChange={handleOnChange}
              value={item.n_plastik || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="n_organik"
              name="n_organik"
              label="Organik (kg)"
              type="number"
              fullWidth
              autoComplete="n_organik"
              onChange={handleOnChange}
              value={item.n_organik || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="n_kertas"
              name="n_kertas"
              label="Kertas (kg)"
              type="number"
              fullWidth
              autoComplete="n_kertas"
              onChange={handleOnChange}
              value={item.n_kertas || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="n_kaca"
              name="n_kaca"
              label="Kaca (kg)"
              type="number"
              fullWidth
              autoComplete="n_kaca"
              onChange={handleOnChange}
              value={item.n_kaca || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="n_karet"
              name="n_karet"
              label="Karet (kg)"
              type="number"
              fullWidth
              autoComplete="n_karet"
              onChange={handleOnChange}
              value={item.n_karet || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="n_kayu"
              name="n_kayu"
              label="Kayu (kg)"
              type="number"
              fullWidth
              autoComplete="n_kayu"
              onChange={handleOnChange}
              value={item.n_kayu || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="n_lain"
              name="n_lain"
              label="Lain2 (kg)"
              type="number"
              fullWidth
              autoComplete="n_lain"
              onChange={handleOnChange}
              value={item.n_lain || ""}
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
