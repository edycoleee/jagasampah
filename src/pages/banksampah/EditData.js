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

const EditData = React.memo(({ open, handleClose, currentItem }) => {
  const { SaveEditData, kecamatan } = useContext(DataContext);
  const [item, setItem] = useState(currentItem);
  const [c_pildesa, setPilDesa] = useState([]);

  useEffect(() => {
    //console.log("RENDER effect",currentItem);
    setItem(currentItem);
  }, [currentItem]);

  useEffect(() => {
    //console.log("kecamatan :", item.c_kecamatan,kecamatan );
    if (item.c_kecamatan) {
      const L = kecamatan;
      const aa = L.filter((kec) => kec.id === item.c_kecamatan);
      //console.log(aa);
      let bb = [];
      if (aa.length > 0) {
        bb = aa[0].DESA;
      }
      setPilDesa(bb);
      //console.log("data: ",aa[0],kecamatan.lenght);
    }
  }, [item.c_kecamatan,kecamatan]);

  //Option TPA-----------------------------------
  let pilihKec = kecamatan;
  pilihKec = pilihKec.map((item, index) => {
    return (
      <option key={index} value={item.id}>
        {item.id}
      </option>
    );
  });

  let pilihDesa = c_pildesa.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

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
          <Grid item xs={12} sm={6}>
            <label>Kecamatan : </label>
            <select
              id="c_kecamatan"
              onChange={(e) =>
                setItem({
                  ...item,
                  c_kecamatan: e.currentTarget.value,
                })
              }
              value={item.c_kecamatan || ""}
            >
              {pilihKec}
            </select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <label>Desa : </label>
            <select
              id="c_desa"
              onChange={(e) =>
                setItem({
                  ...item,
                  c_desa: e.currentTarget.value,
                })
              }
              value={item.c_desa || ""}
            >
              {pilihDesa}
            </select>
          </Grid>
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
