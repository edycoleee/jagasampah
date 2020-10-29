import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

function LandingPage({ classes }) {
  const ResiduInit = {
    status: "ok",
    totalData: 0,
    totalValue: 0,
    tanggal: "",
  };
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [residu, setResidu] = useState(ResiduInit);

  const endpointResidu =
    "http://localhost:5001/jagasampah/us-central1/api/residutotal";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${endpointResidu}`);
        const result = await response.json();
        console.log(result);
        setResidu((current) => {
          return {
            ...result,
            totalData: result.jumlahData,
            totalValue: result.jumlahValue,
            tanggal: result.tanggal,
            status: result.status,
          };
        });
        if (result.status !== "ok") {
          throw new Error("error");
        }
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <main>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            DINLH - DEMAK
          </Typography>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            JAGA SAMPAH
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Aplikasi Dinas Lingkungan Hidup tentang Persampahan
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="outlined" color="secondary">
                  <Link to="login">LOGIN</Link>
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">
                  <Link to="register">REGISTER</Link>
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random"
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Data Sampah Harian
                </Typography>
                <Typography>
                  Sampah Hari Ini{" "}
                  {isLoading
                    ? "Loading"
                    : `${residu.totalData} Data, ${residu.totalValue} Ton`}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="default">
                  <Link to="/landingresidu">Lihat</Link>
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random"
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Data Sampah 3R
                </Typography>
                <Typography>Pelaporan Perusahaan Sampah 3R</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random"
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Data Bank Sampah
                </Typography>
                <Typography>Data Bank Sampah Kab Demak</Typography>
              </CardContent>
              <CardActions>
                {/* <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button> */}
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}

export default LandingPage;
