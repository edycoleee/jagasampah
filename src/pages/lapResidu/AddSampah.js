import { Box, Button, Grid, Paper } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { CL_TPA } from "../../util/dbschema";
import { AuthContext } from "../../context/AuthContext";
import { SampahContext } from "./ContextSampah";

function AddSampah() {
  const { users } = useContext(AuthContext);
  const { GetDataTgl, c_tanggal, setTanggal } = useContext(SampahContext);

  //State Sampah----------------------------
  const [c_tpa, setTPA] = useState(users.c_defTPA);

  //Default TPA--------------------------------
  useEffect(() => {
    setTPA(users.c_defTPA);
  }, [users.c_defTPA]);

  //Option TPA-----------------------------------
  let pilihTPA = CL_TPA;
  pilihTPA = pilihTPA.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  const onCariData = () => {
    GetDataTgl(c_tanggal, c_tpa);
  };

  return (
    <div>
      <Paper elevation={2}>
        <Box pt={2} pb={2} ml={2} mr={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <label>Lokasi TPA : {"  "}</label>
              <select
                id="c_defTPA"
                onChange={(e) => setTPA(e.currentTarget.value)}
                value={c_tpa || ""}
                //disabled={!editing}
              >
                {pilihTPA}
              </select>
            </Grid>
            <Grid item xs={12} sm={6}>
              Tanggal :
              <input
                name="c_tanggal"
                placeholder="dd-mm-yyyy"
                value={c_tanggal}
                type="date"
                onChange={(e) => setTanggal(e.target.value)}
                //disabled={!editing}
              />
            </Grid>
            <Box mt={2} />
            <Grid item xs={12} sm={6}>
              <Button onClick={onCariData} variant="contained" color="primary">
                CARI DATA
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
}

export default AddSampah;
