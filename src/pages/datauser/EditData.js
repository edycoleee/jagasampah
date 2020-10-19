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
    console.log(item);
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
          <Grid item xs={12} >
            <TextField
              required
              id="c_tipeuser"
              name="c_tipeuser"
              label="Tipe User (user / admin)"
              fullWidth
              autoComplete="c_tipeuser"
              onChange={handleOnChange}
              value={item.c_tipeuser || ""}
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
