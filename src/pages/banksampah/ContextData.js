import React, { createContext, useCallback, useState } from "react";
import app, { Firebase } from "../../util/firebase";
import moment from "moment";
// import {
//   Gajah,
// } from "../../util/dbkecamatan";
import { DATABANKSAMPAH } from "../../util/dbdukung";

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
  const [kecamatan, setKecamatan] = useState([]);
  const [c_tanggal, setTanggal] = useState(today);

  const GetDataFTgl = async (tgl) => {
    //console.log("GetSingleData", tgl);
    await db
      .collection("CL_BANKSAMPAH")
      .where("c_tanggal", "==", tgl)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          Id: doc.id,
          ...doc.data(),
        }));
        //console.log("Render List Effect :", data);
        setDataAwal(data);
      })
      .catch((error) => console.error("Error Get Data :", error));
  };

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
    let tglserver1 = new Date(
      Firebase.firestore.Timestamp.now().seconds * 1000
    );
    let tglserver = moment(tglserver1).format("YYYY-MM-DD");

    console.log(newData);
    await db
      .collection("CL_BANKSAMPAH")
      .add({
        createdAt: tglserver,
        ...newData,
      })
      .then(() => GetAllData());
  };

  const DeleteData = async (id, tgl) => {
    console.log("delete item :", id);
    await db
      .collection("CL_BANKSAMPAH")
      .doc(id)
      .delete()
      .then(() => GetAllData());
  };

  const SaveEditData = async (newData) => {
    console.log(newData);
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

  const UploudData = () => {
    // console.log("Uploud Data");
    // db.collection("CL_KECAMATAN")
    //   .doc("Gajah")
    //   .set({
    //     DESA: Firebase.firestore.FieldValue.arrayUnion("COBA"),
    //   })
    //   .then(() => {
    //     let Desaku = () =>
    //       Gajah.map((item, index) => {
    //         console.log(item);
    //         db.collection("CL_KECAMATAN")
    //           .doc("Gajah")
    //           .update({
    //             DESA: Firebase.firestore.FieldValue.arrayUnion(item),
    //           })
    //           .then(() => {
    //             console.log("Document Add Array");
    //           });
    //       });
    //     Desaku();
    //   });
  };

  const UploudBankSampah = () => {
    console.log("Uploud Data BankSampah");
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
    kecamatan,
    GetKecData,
    UploudData,
    UploudBankSampah,
  };
  return (
    <DataContext.Provider value={DataState}>{children}</DataContext.Provider>
  );
}

export default DataProvider;
