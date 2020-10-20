import React, { createContext, useCallback, useState } from "react";
import app, { Firebase } from "../../util/firebase";
import moment from "moment";
import { DATADRIVER } from "../../util/dbdukung";

const db = app.firestore();

export const DataContext = createContext();

function DataProvider({ children }) {
  const [dataAwal, setDataAwal] = useState([]);

  const GetAllData = useCallback(async () => {
    //console.log("GetAllData");
    await db
      .collection("CL_DRIVER")
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

    //console.log(newData);
    await db
      .collection("CL_DRIVER")
      .add({
        createdAt: tglserver,
        ...newData,
      })
      .then(() => GetAllData());
  };

  const DeleteData = async (id) => {
    console.log("delete item :", id);
    await db
      .collection("CL_DRIVER")
      .doc(id)
      .delete()
      .then(() => GetAllData());
  };

  const SaveEditData = async (newData) => {
    console.log(newData);
    const { id, c_driver, c_nopol, c_kendaraan, c_jenis, c_fkali } = newData;

    await db
      .collection("CL_DRIVER")
      .doc(id)
      .update({
        c_driver,
        c_nopol,
        c_kendaraan,
        c_jenis,
        c_fkali,
      })
      .then(() => GetAllData());
  };

  const AddDummyData = () => {
    console.log("Uploud Dummy Data");
    const dummyData = DATADRIVER;
    const uploudDummy = async (item) => {
      console.log(item);
      await db
        .collection("CL_DRIVER")
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

  const DataState = {
    SaveData,
    dataAwal,
    GetAllData,
    DeleteData,
    SaveEditData,
    AddDummyData,
  };
  return (
    <DataContext.Provider value={DataState}>{children}</DataContext.Provider>
  );
}

export default DataProvider;
