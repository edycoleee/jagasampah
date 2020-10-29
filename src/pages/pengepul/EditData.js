import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "./ContextData";
import { CL_KELOLABANK } from "../../util/dbschema";
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
import PilihKecEdit from "../../components/PilihKecEdit";

const EditData = React.memo(({ open, handleClose, currentItem }) => {
  const { SaveEditData } = useContext(DataContext);
  const [item, setItem] = useState(currentItem);

  useEffect(() => {
    //console.log("RENDER effect",currentItem);
    setItem(currentItem);
  }, [currentItem]);

  let pilihPengelola = CL_KELOLABANK;
  pilihPengelola = pilihPengelola.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });
  const onSimpanEdit = () => {
    console.log(item, currentItem.id);
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
              id="c_nama"
              name="c_nama"
              label="Nama Bank Sampah"
              fullWidth
              autoComplete="c_nama"
              onChange={handleOnChange}
              value={item.c_nama || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label>Pengelola : </label>
            <select
              id="c_pengelola"
              onChange={(e) =>
                setItem({
                  ...item,
                  c_pengelola: e.currentTarget.value,
                })
              }
              value={item.c_pengelola || ""}
            >
              {pilihPengelola}
            </select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="c_alamat"
              name="c_alamat"
              label="Alamat"
              fullWidth
              autoComplete="c_alamat"
              onChange={handleOnChange}
              value={item.c_alamat || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="c_tempat"
              name="c_tempat"
              label="Lokasi "
              fullWidth
              autoComplete="c_tempat"
              onChange={handleOnChange}
              value={item.c_tempat || ""}
            />
          </Grid>
          <PilihKecEdit item={item} setItem={setItem}/>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="c_lang"
              name="c_lang"
              label="Langitude"
              fullWidth
              autoComplete="c_lang"
              onChange={handleOnChange}
              value={item.c_lang || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="c_long"
              name="c_long"
              label="Longitude"
              fullWidth
              autoComplete="c_long"
              onChange={handleOnChange}
              value={item.c_long || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="c_Sktetap"
              name="c_Sktetap"
              label="SK Penetapan"
              fullWidth
              autoComplete="c_Sktetap"
              onChange={handleOnChange}
              value={item.c_Sktetap || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="c_ket"
              name="c_ket"
              label="Keterangan"
              fullWidth
              autoComplete="c_ket"
              onChange={handleOnChange}
              value={item.c_ket || ""}
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
