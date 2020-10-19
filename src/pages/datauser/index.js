import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import MenuAppbar from "../../components/MenuAppbar";
import ScrollButton from "../../components/ScrollButton";
import { Box, Container, Typography } from "@material-ui/core";
import DataProvider from "./ContextData";
import ListData from "./ListData";

function IndexUserAdmin() {
  const { users } = useContext(AuthContext);
  return (
    <DataProvider>
      <MenuAppbar />
      <Container maxWidth="sm">
        <Box mt={2} />
        <Typography component="h1" variant="h4" align="center">
          Data User
        </Typography>
        <Typography variant="h6" align="center">
          {users.c_username}
        </Typography>
      </Container>
      <Box mt={2} />
      <Container maxWidth="md">
        {users.c_tipeuser === "admin" ? <ListData /> : "Khusus Admin"}
      </Container>
      <ScrollButton />
    </DataProvider>
  );
}

export default IndexUserAdmin;
