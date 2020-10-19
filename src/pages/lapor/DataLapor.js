import { Box, Grid, Paper, Typography, Link } from "@material-ui/core";
import React, { useContext } from "react";
import { DataContext } from "./ContextData";

function DataLapor() {
  const { dataAwal } = useContext(DataContext);
  return (
    <div>
      <Paper elevation={2}>
        <Box pt={2} pb={2} ml={2} mr={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              DATA LAPORAN : {dataAwal.id ? dataAwal.id : ""}{" "}
              {dataAwal.c_tanggal ? dataAwal.c_tanggal : ""}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Location Latitude :</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">
                {dataAwal.c_lat ? dataAwal.c_lat : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Location Langitude :</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">
                {dataAwal.c_lon ? dataAwal.c_lon : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Lokasi</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">
                {dataAwal.c_lokasi ? dataAwal.c_lokasi : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">No HP</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">
                {dataAwal.c_noHP ? dataAwal.c_noHP : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Keterangan</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">
                {dataAwal.c_ket ? dataAwal.c_ket : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Gambar 1</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" align="center">
                {dataAwal.c_fileImg1 === "" ? (
                  "Belum Ada"
                ) : (
                  <Link
                    href={dataAwal.c_fileImg1}
                    onClick={(e) => e.preventDefault}
                  >
                    {dataAwal.c_namafile1 ? dataAwal.c_namafile1 : ""}
                  </Link>
                )}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Gambar 2</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" align="center">
              {dataAwal.c_fileImg2 === "" ? (
                "Belum Ada"
              ) : (
                <Link
                  href={dataAwal.c_fileImg2}
                  onClick={(e) => e.preventDefault}
                >
                  {dataAwal.c_namafile2 ? dataAwal.c_namafile2 : ""}
                </Link>
              )}
            </Typography>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
}

export default DataLapor;
