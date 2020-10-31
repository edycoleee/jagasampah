import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { CL_TPA } from "../../util/dbschema";
import { AuthContext } from "../../context/AuthContext";
import { SampahContext } from "./ContextSampah";
import PilihBankSampah from "../../components/PilihBankSampah";

function AddSampah() {
  const { users } = useContext(AuthContext);
  const {
    GetDataTgl,
    c_tanggal,
    setTanggal,
    GetAllDataTgl,
    getDataBank,
    setIdBank,
    nmBank,
    setNmBank,
    alamatBank,
    setAlamatBank,
  } = useContext(SampahContext);
  const [checkedAll, setCheckedAll] = useState(false);

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
    if (checkedAll) {
      return GetAllDataTgl(c_tanggal);
    }
    return GetDataTgl(c_tanggal);
  };

  return (
    <div>
      <PilihBankSampah
        getDataBank={getDataBank}
        setIdBank={setIdBank}
        nmBank={nmBank}
        setNmBank={setNmBank}
        alamatBank={alamatBank}
        setAlamatBank={setAlamatBank}
      />{" "}
      <Box mt={2} />
      <Paper elevation={2}>
        <Box pt={2} pb={2} ml={2} mr={2}>
          <Grid container spacing={3}>
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
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedAll}
                    onChange={(event) => setCheckedAll(event.target.checked)}
                    name="checkedAll"
                    color="primary"
                  />
                }
                label="Semua Pengelola 3R"
              />
            </Grid>
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
