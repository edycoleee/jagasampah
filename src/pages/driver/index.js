import React, {  useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import MenuAppbar from "../../components/MenuAppbar";
import ScrollButton from "../../components/ScrollButton";
import { Box, Container, Typography } from "@material-ui/core";
import DataProvider from "./ContextData";
import AddData from "./AddData";
import ListData from "./ListData";

function IndexDriver() {
  const { users } = useContext(AuthContext);
  return (
    <DataProvider>
      <MenuAppbar />
      <Container maxWidth="sm">
        <Box mt={2} />
        <Typography component="h1" variant="h4" align="center">
          Data Driver
        </Typography>
        <Typography variant="h6" align="center">
          {users.c_username}
        </Typography>
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

export default IndexDriver;