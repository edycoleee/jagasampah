import React, { createContext, useCallback, useState } from "react";
import app, { Firebase, LocalServer,Develop } from "../../util/firebase";
import moment from "moment";
const db = app.firestore();
//setting jika menggunakan emulator firestore
if (LocalServer) {
  db.settings({ host: "localhost:8080", ssl: false });
}

export const SampahContext = createContext();

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
  const [dataDriver, setDataDriver] = useState([]);
  const [c_tanggal, setTanggal] = useState(today);

  const GetDataTgl = async (tgl, tpa) => {
    await db
      .collection("CL_SAMPAHHARI")
      .where("c_tanggal", "==", tgl)
      .where("c_tpa", "==", tpa)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (Develop) {
          console.log("STEP : GET DATA HARIAN TGL TPA");
        }
        setDataSampah(data);
      })
      .catch((error) => console.error("Error Get Data :", error));
  };

  const GetDataTanggal = async (tgl) => {
    await db
      .collection("CL_SAMPAHHARI")
      .where("c_tanggal", "==", tgl)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (Develop) {
          console.log("STEP : GET DATA HARIAN TGL");
        }
        setDataSampah(data);
      })
      .catch((error) => console.error("Error Get Data :", error));
  };

  const GetData = useCallback(async () => {
    await db
      .collection("CL_SAMPAHHARI")
      .where("c_tanggal", "==", c_tanggal)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (Develop) {
          console.log("STEP : GET DATA ALL HARIAN");
        }
        setDataSampah(data);
      })
      .catch((error) => console.error("Error Get Data :", error));
  }, [c_tanggal]);

  const GetDriver = useCallback(async () => {
    await db
      .collection("CL_DRIVER")
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDataDriver(data);
        if (Develop) {
          console.log("STEP : GET DATA DRIVER");
        }
      })
      .catch((error) => console.error("Error Get Data :", error));
  }, []);

  const SaveData = async (newData) => {
    if (Develop) {
      console.log("STEP : SAVE DATA SAMPAH", newData);
    }
    let tglserver1 = new Date(
      Firebase.firestore.Timestamp.now().seconds * 1000
    );
    let tglserver = moment(tglserver1).format("YYYY-MM-DD");
    await db
      .collection("CL_SAMPAHHARI")
      .add({
        createdAt: tglserver,
        ...newData,
      })
      .then(() => GetDataTanggal(newData.c_tanggal));
  };

  const DeleteData = async (id, tgl) => {
    if (Develop) {
      console.log("STEP : DELETE DATA", id);
    }
    await db
      .collection("CL_SAMPAHHARI")
      .doc(id)
      .delete()
      .then(() => GetDataTanggal(tgl));
  };

  const SaveEditData = async (newData) => {
    if (Develop) {
      console.log("STEP : SAVE EDIT DATA", newData);
    }
    const {
      id,
      c_driver,
      c_nopol,
      c_kendaraan,
      c_jenis,
      c_asal,
      n_jmlrit,
      n_volm3,
      n_volton,
      c_tanggal,
      c_tpa,
    } = newData;

    let tgl = new Date(c_tanggal);
    let tahun = String(tgl.getFullYear());
    let bulan = String(tgl.getMonth() + 1);

    await db
      .collection("CL_SAMPAHHARI")
      .doc(id)
      .update({
        c_driver,
        c_nopol,
        c_kendaraan,
        c_jenis,
        c_asal,
        n_jmlrit,
        n_volm3,
        n_volton,
        c_tanggal,
        c_tpa,
        c_bulan: bulan,
        c_tahun: tahun,
      })
      .then(() => GetDataTanggal(c_tanggal));
  };

  const UploudDummy = (newData) => {
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
        .collection("CL_SAMPAHHARI")
        .add({
          createdAt: tglserver,
          c_user: "ADMIN",
          c_tpa: "KALIKONDANG",
          ...item,
        })
        .then(() => {
          console.log("Document Add Array");
        });
    };

    newData.map((item, index) => uploudData(item));
  };

  const SampahState = {
    SaveData,
    dataSampah,
    GetData,
    DeleteData,
    SaveEditData,
    GetDataTgl,
    c_tanggal,
    setTanggal,
    GetDriver,
    dataDriver,
    UploudDummy,
  };
  return (
    <SampahContext.Provider value={SampahState}>
      {children}
    </SampahContext.Provider>
  );
}

export default SampahProvider;
