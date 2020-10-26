import { Box, Grid, Typography } from "@material-ui/core";
<<<<<<< HEAD:src/components/PilihKecamatan.js
import React, { useEffect, useState } from "react";
import { Develop } from "../util/firebase";
import {DATAKECAMATAN} from "../util/dbkecamatan"

function PilihKecamatan({ c_kecamatan, setKecamatan, c_desa, setDesa }) {
=======
import React, { useContext, useEffect, useState } from "react";

import { DataContext } from "./ContextData";

function PilihKecamatan() {
  const {
    kecamatan,
    c_kecamatan,
    setKecamatan,
    c_desa,
    setDesa,
    GetKecData,
  } = useContext(DataContext);
>>>>>>> 3fefe25020948e70cc4a91a7b2e7fde7da64e22c:src/pages/tpst/PilihKecamatan.js

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
    if (c_kecamatan !== "") {
      const L = DATAKECAMATAN;
      const aa = L.filter((kec) => kec.id === c_kecamatan);
      const bb = aa[0].DESA;
      setPilDesa(bb);
      if(Develop) {
        console.log("PILIHAN : ",aa, bb);
      }
    }
  }, [c_kecamatan]);

  const onChangeKec = (e) => {
    const pilih = e.currentTarget.value;
    //console.log(kecamatan.id);
    setKecamatan(pilih);
  };

  return (
    <Box pt={1} pb={1} ml={1} mr={1}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="subtitle2" align="center">
            PILIH KECAMATAN DAN DESA
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <label>Kecamatan : </label>
          <select
            id="c_kecamatan"
            onChange={onChangeKec}
            value={c_kecamatan || ""}
          >
            {pilihKec}
          </select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <label>Desa/Kel : </label>
          <select
            id="c_desa"
            onChange={(e) => setDesa(e.currentTarget.value)}
            value={c_desa || ""}
          >
            {pilihDesa}
          </select>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PilihKecamatan;
