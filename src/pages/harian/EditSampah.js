import React, { useContext, useEffect, useState } from "react";
import { SampahContext } from "./ContextSampah";
import { CL_TPA } from "../../util/dbschema";
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

const EditSampah = React.memo(({ open, handleClose, currentItem }) => {
  const { SaveEditData } = useContext(SampahContext);
  const [item, setItem] = useState(currentItem);
  useEffect(() => {
    //console.log("RENDER effect",currentItem);
    setItem(currentItem);
  }, [currentItem]);

  //Option TPA-----------------------------------
  let pilihTPA = CL_TPA;
  pilihTPA = pilihTPA.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  const onSimpanEdit = () => {
    console.log(item, currentItem.Id);
    SaveEditData(item, currentItem.Id);
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
            <label>Lokasi TPA : {"  "}</label>
            <select
              id="c_defTPA"
              onChange={(e) =>
                setItem({
                  ...item,
                  c_tpa: e.currentTarget.value,
                })
              }
              value={item.c_tpa || ""}
            >
              {pilihTPA}
            </select>
          </Grid>
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
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="c_asal"
              name="c_asal"
              label="Asal Sampah"
              fullWidth
              autoComplete="c_asal"
              onChange={handleOnChange}
              value={item.c_asal || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="n_jmlrit"
              name="n_jmlrit"
              label="Volume (Rit)"
              type="number"
              fullWidth
              autoComplete="n_jmlrit"
              onChange={handleOnChange}
              value={item.n_jmlrit || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="n_volm3"
              name="n_volm3"
              label="Volume (M3)"
              type="number"
              fullWidth
              autoComplete="n_volm3"
              onChange={handleOnChange}
              value={item.n_volm3 || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="n_volton"
              name="n_volton"
              label="Volume (Ton)"
              type="number"
              fullWidth
              autoComplete="n_volton"
              onChange={handleOnChange}
              value={item.n_volton || ""}
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

export default EditSampah;
