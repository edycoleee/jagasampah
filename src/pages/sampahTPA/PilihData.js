import { Box, Grid, Paper } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CL_TPA } from "../../util/dbschema";
import { DataContext } from "./ContextData";

function PilihData() {
  const { c_tpa, setTPA } = useContext(DataContext);
  const { users } = useContext(AuthContext);

  //Default TPA--------------------------------
  useEffect(() => {
    setTPA(users.c_defTPA);
  }, [users.c_defTPA, setTPA]);

  //Option TPA-----------------------------------
  let pilihTPA = CL_TPA;
  pilihTPA = pilihTPA.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  return (
    <div>
      <Paper elevation={2}>
        <Box pt={2} pb={2} ml={2} mr={2}>
          <Grid container spacing={3}>
            <Box mt={2} />
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
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
}

export default PilihData;
