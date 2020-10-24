import React, { createContext, useCallback, useState } from "react";
import app, { Firebase, LocalServer,Develop } from "../../util/firebase";
import moment from "moment";
// import {
//   Gajah,
// } from "../../util/dbkecamatan";
import { DATABANKSAMPAH } from "../../util/dbdukung";

const db = app.firestore();
//setting jika menggunakan emulator firestore
if (LocalServer) {
  db.settings({ host: "localhost:8080", ssl: false });
}

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
  const [kecamatan, setKecamatan] = useState([]);
  const [c_tanggal, setTanggal] = useState(today);

  const GetAllData = useCallback(async () => {
    //console.log("GetAllData");
    await db
      .collection("CL_BANKSAMPAH")
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        //console.log("Render List Effect :", data);
        setDataAwal(data);
      })
      .catch((error) => console.error("Error Get Data :", error));
  }, []);

  const SaveData = async (newData) => {
    if (Develop) {
      console.log("STEP : SAVE BANK SAMPAH", newData);
    }
    let tglserver1 = new Date(
      Firebase.firestore.Timestamp.now().seconds * 1000
    );
    let tglserver = moment(tglserver1).format("YYYY-MM-DD");

    return await db
      .collection("CL_BANKSAMPAH")
      .add({
        createdAt: tglserver,
        ...newData,
      })
      .then(() => GetAllData());
  };

  const DeleteData = async (id) => {
    if (Develop) {
      console.log("STEP : DELETE DATA", id);
    }
    await db
      .collection("CL_BANKSAMPAH")
      .doc(id)
      .delete()
      .then(() => GetAllData());
  };

  const SaveEditData = async (newData) => {
    if (Develop) {
      console.log("STEP : SAVE EDIT DATA", newData);
    }
    const {
      id,
      c_nama,
      c_alamat,
      c_tempat,
      c_kecamatan,
      c_desa,
      c_lang,
      c_long,
      c_Sktetap,
      c_pengelola,
      c_ket,
    } = newData;

    await db
      .collection("CL_BANKSAMPAH")
      .doc(id)
      .update({
        c_nama,
        c_alamat,
        c_tempat,
        c_kecamatan,
        c_desa,
        c_lang,
        c_long,
        c_Sktetap,
        c_pengelola,
        c_ket,
      })
      .then(() => GetAllData());
  };

  const GetKecData = useCallback(async () => {
    //console.log("GetKecData");
    await db
      .collection("CL_KECAMATAN")
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        //console.log("Render List Effect :", data);
        setKecamatan(data);
      })
      .catch((error) => console.error("Error Get Data :", error));
  }, []);

  const UploudBankSampah = () => {
    if (Develop) {
      console.log("STEP : UPLOUD DUMMY DATA");
    }
    let tglserver1 = new Date(
      Firebase.firestore.Timestamp.now().seconds * 1000
    );
    let tglserver = moment(tglserver1).format("YYYY-MM-DD");

    const uploudData = async (item) => {
      console.log(item);
      await db
        .collection("CL_BANKSAMPAH")
        .add({
          createdAt: tglserver,
          c_user: "ADMIN",
          c_tempat: "Belum diisi",
          c_lang: "Belum diisi",
          c_long: "Belum diisi",
          c_bulan: "10",
          c_tahun: "2020",
          c_ket: "",
          c_aktif: "AKTIF",
          ...item,
        })
        .then(() => {
          console.log("Document Add Array");
        });
    };

    DATABANKSAMPAH.map((item, index) => uploudData(item));
    GetAllData()
  };

  const DataState = {
    SaveData,
    dataAwal,
    GetAllData,
    DeleteData,
    SaveEditData,
    c_tanggal,
    setTanggal,
    kecamatan,
    GetKecData,
    UploudBankSampah,
  };
  return (
    <DataContext.Provider value={DataState}>{children}</DataContext.Provider>
  );
}

export default DataProvider;
