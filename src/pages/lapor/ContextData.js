import React, { createContext, useCallback, useState } from "react";
import app, { Firebase, storage, LocalServer,Develop } from "../../util/firebase";
import moment from "moment";


const db = app.firestore();
//setting jika menggunakan emulator firestore
if (LocalServer) {
  db.settings({ host: "localhost:8080", ssl: false });
}

export const DataContext = createContext();

function DataProvider({ children }) {
  const [dataAwal, setDataAwal] = useState([]);
  const [semuaData, setSemuaData] = useState([]);
  const [mapPoints, setMapPoints] = useState({
    lat: -6.8909,
    lng: 110.6396,
  })
  const [progressUploud, setProgressUploud] = useState(false);

  const GetAllData = useCallback(async () => {
    const unsubscribe = await db
      .collection("CL_LAPOR")
      .orderBy("c_createdAt")
      .onSnapshot((snapshot) => {
        const tempData = [];
        snapshot.forEach((doc) => {
          tempData.push({ ...doc.data(), id: doc.id });
        });
        setSemuaData(tempData);
        if (Develop) {
          console.log("STEP : GET ALL DATA");
        }
      });
    return unsubscribe;
  }, []);

  const GetUserData = useCallback(async (id) => {
    if (Develop) {
      console.log("STEP : GET USER LAPOR DATA");
    }
    const unsubscribe = await db
      .collection("CL_LAPOR")
      .doc(id)
      .get()
      .then((doc) => {
        if (!doc.exists) return;
        let data = doc.data();
        data.id = id;
        setDataAwal(data);
      })
      .catch((error) => console.error("Error Get Data :", error));
      return unsubscribe;
  }, []);

  const SaveData = async (newData) => {
    if (Develop) {
      console.log("STEP : SAVE DATA LAPOR", newData);
    }
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
    if (Develop) {
      console.log("STEP : DELETE DATA", id);
    }
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
    file
  ) => {
    if (Develop) {
      console.log("STEP : SAVE EDIT DATA");
    }
    await db.collection("CL_LAPOR").doc(id).update({
      c_tgljadwal,
      c_ketjadwal,
      c_tgljemput,
      c_ketjemput,
      proses,
      c_namafile3: file,
    });
    //.then(() => GetAllData());
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
