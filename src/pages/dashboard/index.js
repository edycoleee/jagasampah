import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MenuAppbar from "../../components/MenuAppbar";
import ScrollButton from "../../components/ScrollButton";
import { AuthContext } from "../../context/AuthContext";

function Dashboard() {
  const { users} = useContext(
    AuthContext
  );

  return (
    <div>
      <MenuAppbar />
      <ScrollButton />
      <Container maxWidth="sm">
        <Box mt={2} />
        <Typography component="h1" variant="h4" align="center">
          Dashboard Pengguna
        </Typography>
        <Typography variant="h6" align="center">
          {users.c_username}
        </Typography>
        <Box mt={4} />
        <Paper elevation={2}>
          <Box mt={1} ml={1} mr={1}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Link to="/sampah3r">
                  <Button variant="contained" color="secondary">
                    Bank Sampah
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Link to="/harian">
                  <Button variant="contained" color="primary">
                    Sampah TPA
                  </Button>
                </Link>
              </Grid>
              <Box mt={2} />
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Data Pengguna
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">User Name :</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">{users.c_username}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Tipe User :</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">{users.c_tipeuser}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Nama Bidang :</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">{users.c_bidang}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Bagian :</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">{users.c_bagian}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">No Telp :</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">{users.c_nohp}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Email Pengguna :</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">{users.c_email}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default Dashboard;
