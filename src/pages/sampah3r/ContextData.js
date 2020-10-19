import React, { createContext, useCallback, useState } from "react";
import app, { Firebase } from "../../util/firebase";
import moment from "moment";
const db = app.firestore();

export const DataContext = createContext();

function DataProvider({ children }) {
  //Init Today----------------------------
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  let today = year + "-" + month + "-" + day;

  const [dataAwal, setDataAwal] = useState([]);
  const [c_tanggal, setTanggal] = useState(today);
  const [idBank, setIdBank] = useState("");
  const [nmBank, setNmBank] = useState("");

  const GetDataFTgl = useCallback(async (tgl) => {
    console.log("GetSingleData", tgl);
    await db
      .collection("CL_SAMPAH3R")
      .where("c_tanggal", "==", tgl)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Render List Effect :", data);
        setDataAwal(data);
      })
      .catch((error) => console.error("Error Get Data :", error));
  }, []);

  const GetAllData = useCallback(async () => {
    console.log("GetAllData");
    await db
      .collection("CL_SAMPAH3R")
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Render List Effect :", data);
        setDataAwal(data);
      })
      .catch((error) => console.error("Error Get Data :", error));
  }, []);

  const SaveData = async (newData) => {
    let tglserver1 = new Date(
      Firebase.firestore.Timestamp.now().seconds * 1000
    );
    let tglserver = moment(tglserver1).format("YYYY-MM-DD");

    console.log(newData);
    await db
      .collection("CL_SAMPAH3R")
      .add({
        createdAt: tglserver,
        ...newData,
      })
      .then(() => GetDataFTgl(c_tanggal));
  };

  const DeleteData = async (id, tgl) => {
    console.log("delete item :", id);
    await db
      .collection("CL_SAMPAH3R")
      .doc(id)
      .delete()
      .then(() => GetDataFTgl(c_tanggal));
  };

  const SaveEditData = async (newData) => {
    console.log(newData);
    const { id, c_tanggal } = newData;

    let tgl = new Date(c_tanggal);
    let tahun = String(tgl.getFullYear());
    let bulan = String(tgl.getMonth() + 1);

    await db
      .collection("CL_SAMPAH3R")
      .doc(id)
      .update({
        c_tanggal,
        c_bulan: bulan,
        c_tahun: tahun,
      })
      .then(() => GetAllData());
  };

  const getDataBank = async () => {
    console.log("Getdata2");
    let data = [];
    await db
      .collection("CL_BANKSAMPAH")
      .get()
      .then((snapshot) => {
        data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Getdata3 :", data);
      });
    return data;
  };

  const DataState = {
    SaveData,
    dataAwal,
    GetAllData,
    DeleteData,
    SaveEditData,
    GetDataFTgl,
    c_tanggal,
    setTanggal,
    getDataBank,
    idBank,
    setIdBank,
    nmBank,
    setNmBank,
  };
  return (
    <DataContext.Provider value={DataState}>{children}</DataContext.Provider>
  );
}

export default DataProvider;
