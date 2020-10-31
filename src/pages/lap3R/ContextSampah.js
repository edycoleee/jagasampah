import React, { createContext, useCallback, useState } from "react";
import app, { LocalServer, Develop } from "../../util/firebase";

export const SampahContext = createContext();

const db = app.firestore();
//setting jika menggunakan emulator firestore
if (LocalServer) {
  db.settings({ host: "localhost:8080", ssl: false });
}

function SampahProvider({ children }) {
  //Init Today----------------------------
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  let today = year + "-" + month + "-" + day;

  const [dataSampah, setDataSampah] = useState([]);
  const [c_tanggal, setTanggal] = useState(today);

  const [idBank, setIdBank] = useState("");
  const [nmBank, setNmBank] = useState("");
  const [alamatBank, setAlamatBank] = useState("");

  const GetDataTgl = async (tgl) => {
    await db
      .collection("CL_SAMPAH3R")
      .where("c_tanggal", "==", tgl)
      .where("idBank", "==", idBank)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          Id: doc.id,
          ...doc.data(),
        }));
        ///console.log("Render List Effect :", data);
        setDataSampah(data);
      })
      .catch((error) => console.error("Error Get Data :", error));
  };

  const GetAllDataTgl = async (tgl) => {
    await db
      .collection("CL_SAMPAH3R")
      .where("c_tanggal", "==", tgl)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          Id: doc.id,
          ...doc.data(),
        }));
        ///console.log("Render List Effect :", data);
        setDataSampah(data);
      })
      .catch((error) => console.error("Error Get Data :", error));
  };

  const GetData = useCallback(async () => {
    await db
      .collection("CL_SAMPAH3R")
      .where("c_tanggal", "==", c_tanggal)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          Id: doc.id,
          ...doc.data(),
        }));
        //console.log("Render List Effect :", data);
        setDataSampah(data);
      })
      .catch((error) => console.error("Error Get Data :", error));
  }, [c_tanggal]);

  const getDataBank = async () => {
    if (Develop) {
      console.log("STEP : GET DATA BANKSAMPAH");
    }
    let data = [];
    await db
      .collection("CL_BANKSAMPAH")
      .get()
      .then((snapshot) => {
        data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
    return data;
  };

  const SampahState = {
    dataSampah,
    GetData,
    GetDataTgl,
    c_tanggal,
    setTanggal,
    GetAllDataTgl,
    getDataBank,
    idBank,
    setIdBank,
    nmBank,
    setNmBank,
    alamatBank,
    setAlamatBank,
  };
  return (
    <SampahContext.Provider value={SampahState}>
      {children}
    </SampahContext.Provider>
  );
}

export default SampahProvider;
