import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import MenuAppbar from "../../components/MenuAppbar";
import ScrollButton from "../../components/ScrollButton";
import { Box, Container, Typography } from "@material-ui/core";
import AddData from "./AddData";
import DataProvider from "./ContextData";
import PilihData from "./PilihData";
import ListData from "./ListData";

function IndexSampahTPA() {
  const { users } = useContext(AuthContext);

  return (
    <DataProvider>
      <MenuAppbar />
      <Container maxWidth="sm">
        <Box mt={2} />
        <Typography component="h1" variant="h4" align="center">
          Pengelolaan Sampah TPA
        </Typography>
        <Typography variant="h6" align="center">
          {users.c_username}
        </Typography>
        <PilihData />
        <AddData />
      </Container>
      <Box mt={2} />
      <Container maxWidth="md">
        <ListData />
      </Container>
      <ScrollButton />
    </DataProvider>
  );
}

export default IndexSampahTPA;
