import React, { useContext } from "react";
import AddSampah from "./AddSampah";
import { AuthContext } from "../../context/AuthContext";
import MenuAppbar from "../../components/MenuAppbar";
import ScrollButton from "../../components/ScrollButton";
import { Box, Container, Typography } from "@material-ui/core";
import SampahProvider from "./ContextSampah";
import ListSampah from "./ListSampah";
import FetchData from "./FetchData";

function IndexSampahHari() {
  const { users } = useContext(AuthContext);

  return (
    <SampahProvider>
      <MenuAppbar />
      <Container maxWidth="sm">
        <Box mt={2} />
        <Typography component="h1" variant="h4" align="center">
        Residu TPA Harian
        </Typography>
        <Typography variant="h6" align="center">
          {users.c_username}
        </Typography>
        <AddSampah />
        {users.c_tipeuser === "admin" ? <FetchData /> : "Khusus Admin"}
      </Container>
      <Box mt={2} />
      <Container maxWidth="md">
        <ListSampah />
      </Container>
      <ScrollButton />
    </SampahProvider>
  );
}

export default IndexSampahHari;
