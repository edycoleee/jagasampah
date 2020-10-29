import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import MenuAppbar from "../../components/MenuAppbar";
import ScrollButton from "../../components/ScrollButton";
import { Box, Container, Typography } from "@material-ui/core";
import DataProvider from "./ContextData";
import AddData from "./AddData";
import ListData from "./ListData";

function IndexDataPengepul() {
  const { users } = useContext(AuthContext);

  return (
    <DataProvider>
      <MenuAppbar />
      <Container maxWidth="sm">
        <Box mt={2} />
        <Typography component="h1" variant="h4" align="center">
          Data Pengepul Sampah Kab Demak
        </Typography>
        <Typography variant="h6" align="center">
          {users.c_username}
        </Typography>
        <AddData />
      </Container>
      <Box mt={2} />
      {users.c_tipeuser === "admin" && (
      <Container maxWidth="lg">
        <ListData />
      </Container>
      )}
      <ScrollButton />
    </DataProvider>
  );
}

export default IndexDataPengepul;
