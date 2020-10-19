import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import MenuAppbar from "../../components/MenuAppbar";
import ScrollButton from "../../components/ScrollButton";
import { Box, Container, Typography } from "@material-ui/core";
import LeafletMap from "./Map";
import DataProvider from "./ContextData";
import AddData from "./AddData";
import DataLapor from "./DataLapor";
import TindakLanjut from "./TindakLanjut";

function IndexLapor() {
  const { users } = useContext(AuthContext);

  return (
    <DataProvider>
      <MenuAppbar />
      <Container maxWidth="sm">
        <Box mt={2} />
        <Typography component="h1" variant="h4" align="center">
          Lapor Sampah
        </Typography>
        <Typography variant="h6" align="center">
          {users.c_username}
        </Typography>
      </Container>
      <Box mt={2} />
      <Container maxWidth="md">
        <div className="leaflet-container">
          <LeafletMap />
        </div>
      </Container>
      <Container maxWidth="sm">
        <Box mt={2} />
        <AddData />
      </Container>
      <Container maxWidth="sm">
        <Box mt={2} />
        <DataLapor />
      </Container>
      <Container maxWidth="sm">
        <Box mt={2} />
        <TindakLanjut />
      </Container>
      <ScrollButton />
    </DataProvider>
  );
}

export default IndexLapor;
