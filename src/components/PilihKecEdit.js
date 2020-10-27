import { Box, Grid, Typography } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { Develop } from "../util/firebase";
import { DATAKECAMATAN } from "../util/dbkecamatan";

function PilihKecEdit({ item, setItem }) {
  const [c_pildesa, setPilDesa] = useState([]);

  let pilihKec = DATAKECAMATAN;
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

  useEffect(() => {
    //console.log("kecamatan :", c_kecamatan);
    if (item.c_kecamatan) {
      const L = DATAKECAMATAN;
      const aa = L.filter((kec) => kec.id === item.c_kecamatan);
      const bb = aa[0].DESA;
      setPilDesa(bb);
      if (Develop) {
        console.log("PILIHAN : ", aa, bb);
      }
    }
  }, [item.c_kecamatan]);

  //   const onChangeKec = (e) => {
  //     const pilih = e.currentTarget.value;
  //     //console.log(kecamatan.id);
  //     setKecamatan(pilih);
  //   };

  return (
    <Fragment>
      <Grid item xs={12}>
        <Typography variant="subtitle2" align="center">
          PILIH KECAMATAN DAN DESA
        </Typography>
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
        <label>Desa/Kel : </label>
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
    </Fragment>
  );
}

export default PilihKecEdit;
