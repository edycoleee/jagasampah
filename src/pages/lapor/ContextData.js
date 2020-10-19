import React, { createContext, useCallback, useState } from "react";
import app, { Firebase, storage } from "../../util/firebase";
import moment from "moment";
import { DATADRIVER } from "../../util/dbdukung";

const db = app.firestore();

export const DataContext = createContext();

function DataProvider({ children }) {
  const [dataAwal, setDataAwal] = useState([]);
  const [semuaData, setSemuaData] = useState([]);
  const [mapPoints, setMapPoints] = useState([]);
  const [progressUploud, setProgressUploud] = useState(false);

  const GetAllData = useCallback(async () => {
    console.log("GetAllData");
    const unsubscribe = db
      .collection("CL_LAPOR")
      .orderBy("c_createdAt")
      .onSnapshot((snapshot) => {
        const tempData = [];
        snapshot.forEach((doc) => {
          tempData.push({ ...doc.data(), id: doc.id });
        });
        setSemuaData(tempData);
      });
    return unsubscribe;
  }, []);

  const GetUserData = useCallback(async (id) => {
    console.log("GetUserData");
    await db
      .collection("CL_LAPOR")
      .doc(id)
      .get()
      .then((doc) => {
        if (!doc.exists) return;
        let data = doc.data();
        data.id = id;
        setDataAwal(data);
        console.log("Simpan :", data);
      })
      .catch((error) => console.error("Error Get Data :", error));
  }, []);

  const SaveData = async (newData) => {
    setProgressUploud(true);
    //Init Today----------------------------
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    let today = year + "-" + month + "-" + day;

    let tgl = new Date(today);
    let tahun = String(tgl.getFullYear());
    let bulan = String(tgl.getMonth() + 1);

    let tglserver1 = new Date(
      Firebase.firestore.Timestamp.now().seconds * 1000
    );
    let tglserver = moment(tglserver1).format("YYYY-MM-DD");

    console.log(tglserver1, newData);
    return await db.collection("CL_LAPOR").add({
      c_createdAt: tglserver,
      tglserver: tglserver1,
      c_bulan: bulan,
      c_tanggal: today,
      c_tahun: tahun,
      c_namafile1: "",
      c_fileImg1: "",
      c_namafile2: "",
      c_fileImg2: "",
      c_namafile3: "",
      c_fileImg3: "",
      c_tgljadwal: "",
      c_ketjadwal: "",
      c_tgljemput: "",
      c_ketjemput: "",
      c_userclose: "",
      proses: "lapor",
      ...newData,
    });
  };

  const DeleteData = async (id) => {
    console.log("delete item :", id);
    await db
      .collection("CL_LAPOR")
      .doc(id)
      .delete()
      .then(() => GetAllData());
  };

  const SaveEditData = async (
    id,
    c_tgljadwal,
    c_ketjadwal,
    c_tgljemput,
    c_ketjemput,
    proses,
    file,
  ) => {
    await db
      .collection("CL_LAPOR")
      .doc(id)
      .update({
        c_tgljadwal,
        c_ketjadwal,
        c_tgljemput,
        c_ketjemput,
        proses,
        c_namafile3: file,
      })
      //.then(() => GetAllData());
  };

  const AddDummyData = () => {
    console.log("Uploud Dummy Data");
    const dummyData = DATADRIVER;
    const uploudDummy = async (item) => {
      console.log(item);
      await db
        .collection("CL_LAPOR")
        .add({
          c_user: "ADMIN",
          ...item,
        })
        .then(() => {
          console.log("Document Add Array");
        });
    };
    dummyData.map((item, index) => uploudDummy(item));
  };

  const simpanFileImg1 = async (fileygdisimpan, id) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`${id}/${fileygdisimpan.name}`);
    await fileRef.put(fileygdisimpan);
    db.collection("CL_LAPOR")
      .doc(id)
      .update({
        c_fileImg1: await fileRef.getDownloadURL(),
        proses: "uploud",
      });
  };

  const simpanFileImg2 = async (fileygdisimpan, id) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`${id}/${fileygdisimpan.name}`);
    await fileRef.put(fileygdisimpan);
    db.collection("CL_LAPOR")
      .doc(id)
      .update({
        c_fileImg2: await fileRef.getDownloadURL(),
        proses: "uploud",
      });
    const satu = (id) => GetUserData(id);
    await satu(id);
    await setProgressUploud(false);
  };

  const simpanFileImg3 = async (fileygdisimpan, id) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`${id}/${fileygdisimpan.name}`);
    await fileRef.put(fileygdisimpan);
    db.collection("CL_LAPOR")
      .doc(id)
      .update({
        c_fileImg3: await fileRef.getDownloadURL(),
        proses: "jemput",
      });
    const satu = (id) => GetUserData(id);
    await satu(id);
    await setProgressUploud(false);
  };

  const DataState = {
    SaveData,
    dataAwal,
    GetAllData,
    semuaData,
    DeleteData,
    SaveEditData,
    AddDummyData,
    mapPoints,
    setMapPoints,
    GetUserData,
    progressUploud,
    simpanFileImg1,
    simpanFileImg2,
    simpanFileImg3,
    setDataAwal,
  };
  return (
    <DataContext.Provider value={DataState}>{children}</DataContext.Provider>
  );
}

export default DataProvider;
