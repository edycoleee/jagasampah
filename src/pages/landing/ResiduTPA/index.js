import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AppbarLanding from "../AppbarLanding";
import DataTable from "./DataTable";
import { Develop } from "../../../util/firebase";

function IndexResiduLanding() {
  const ResiduInit = {
    sampahharian: [],
    status: "ok",
    totalData: 0,
    totalValue: 0,
    tanggal: "",
  };
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [residu, setResidu] = useState(ResiduInit);

  const endpointResidu =
    "http://localhost:5001/jagasampah/us-central1/api/residuall";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${endpointResidu}`);
        const result = await response.json();
        if (Develop) {
          console.log(result);
        }
        setResidu((current) => {
          return {
            ...result,
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

  const { sampahharian, jumlahData, jumlahValue, today } = residu;
  if (Develop) {
    console.log(jumlahData, jumlahValue, today);
  }
  if(isLoading) {
    return <p>Loading...</p>
  }
  if(isError) {
    return <p>Terjadi Error Data</p>
  }
  return (
    <div>
      <AppbarLanding />
      <Typography variant="h5" gutterBottom>
        Data Sampah : {jumlahData} data, TANGGAL {today}
      </Typography>
      <Typography variant="h1" component="h2" gutterBottom>
        T : {jumlahValue} TON
      </Typography>
      {/* {JSON.stringify(sampahharian)} */}
      {sampahharian && <DataTable dataView={sampahharian} />}
    </div>
  );
}

export default IndexResiduLanding;
