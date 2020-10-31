import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { CL_BULAN } from "../../util/dbschema";
//import { AuthContext } from "../../context/AuthContext";
import { SampahContext } from "./ContextSampah";
import { Autocomplete } from "@material-ui/lab";
import { Develop } from "../../util/firebase";
import PilihBankSampah from "../../components/PilihBankSampah";
import Notification from "../../components/Notification";

function AddSampah() {
  //const { users } = useContext(AuthContext);
  const {
    GetDataBln,
    LihatDataTpa,
    dataBulanan,
    getDataBank,
    setIdBank,
    idBank,
    nmBank,
    setNmBank,
    alamatBank,
    setAlamatBank,
    GetAllDataBln,
    LihatDataTpaFilter,notify, setNotify
  } = useContext(SampahContext);
  const [checkedAll, setCheckedAll] = useState(true);

  const thn = new Date().getFullYear();
  const tahunPilih = [
    String(thn),
    String(thn - 1),
    String(thn - 2),
    String(thn - 3),
    String(thn - 4),
  ];

  //State Sampah----------------------------
  const [kode, setKode] = useState("01");
  const [bulan, setBulan] = useState("Januari");
  const [tahun, setTahun] = useState("");
  const [loading, setLoading] = useState(false);

  let pilihBulan = CL_BULAN;
  pilihBulan = pilihBulan.map((item, index) => {
    return (
      <option key={index} value={item.nama}>
        {item.nama}
      </option>
    );
  });

  const onCariData = async () => {
    setLoading(true);
    if (Develop) {
      console.log(tahun, kode);
    }
    if (checkedAll) {
      return await GetAllDataBln(tahun, kode).then(() => {
        setLoading(false);
      });
    } else {
      if (idBank === "") {
        setLoading(false);
        return setNotify({
          isOpen: true,
          message: "Pilih Pengelola 3R",
          type: "error",
        });
      }
      return await GetDataBln(tahun, kode, idBank).then(() => {
        setLoading(false);
      });
    }
  };

  const onChangeBulan = (event) => {
    //Desctructuring Searching
    setBulan(event.currentTarget.value);
    const result = CL_BULAN.find(
      ({ nama }) => nama === event.currentTarget.value
    );
    //console.log("hasilnya destructuring", result);
    if (result) {
      setKode(result.kode);
    } else {
      setKode("01");
    }
  };

  const onLihatData = async () => {
    if (checkedAll) {
      await LihatDataTpa(tahun, kode);
    } else {
      if (idBank === "") {
        return setNotify({
          isOpen: true,
          message: "Pilih Pengelola 3R",
          type: "error",
        });
      }
      await LihatDataTpaFilter(tahun, kode, idBank);
    }
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
              {/* {JSON.stringify(kode)} */}
              <label>Bulan : {"  "}</label>
              <select
                id="bulan"
                onChange={onChangeBulan}
                value={bulan || ""}
                //disabled={!editing}
              >
                {pilihBulan}
              </select>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* {JSON.stringify(tahun)} */}
              <Autocomplete
                inputValue={tahun}
                onInputChange={(event, newInputValue) => {
                  setTahun(newInputValue);
                }}
                id="combo-box1"
                name="tahun"
                options={tahunPilih}
                defaultValue={String(thn)}
                renderInput={(params) => (
                  <TextField {...params} label="Pilih Tahun" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={onCariData}
                disabled={loading}
                variant="contained"
                color="primary"
              >
                HITUNG DATA
              </Button>{" "}
              <Button onClick={onLihatData} variant="contained" color="primary">
                LIHAT DATA
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              {dataBulanan.length === 0
                ? "Data Belum Ada"
                : `${dataBulanan.length}  Data`}
            </Grid>
          </Grid>
        </Box>
      </Paper>
      {/* -----------------------------SnackBar--------------------- */}
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default AddSampah;
