import React, { createContext, useCallback, useState } from "react";
import app, { LocalServer, Develop } from "../../util/firebase";

const db = app.firestore();
//setting jika menggunakan emulator firestore
if (LocalServer) {
  db.settings({ host: "localhost:8080", ssl: false });
}

export const DataContext = createContext();

function DataProvider({ children }) {
  const [dataAwal, setDataAwal] = useState([]);

  const GetAllData = useCallback(async () => {
    await db
      .collection("CL_USER")
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (Develop) {
          console.log("STEP : GET USER DATA", data);
        }
        setDataAwal(data);
      })
      .catch((error) => console.error("Error Get Data :", error));
  }, []);

  // const SaveData = async (newData) => {
  //   let tglserver1 = new Date(
  //     Firebase.firestore.Timestamp.now().seconds * 1000
  //   );
  //   let tglserver = moment(tglserver1).format("YYYY-MM-DD");

  //   console.log(newData);
  //   await db
  //     .collection("CL_USER")
  //     .add({
  //       createdAt: tglserver,
  //       ...newData,
  //     })
  //     .then(() => GetAllData());
  // };

  const SaveEditData = async (newData) => {
    if (Develop) {
      console.log("STEP : SAVE EDIT DATA", newData);
    }
    const { id, c_tipeuser } = newData;

    await db
      .collection("CL_USER")
      .doc(id)
      .update({
        c_tipeuser,
      })
      .then(() => GetAllData());
  };

  const DataState = {
    dataAwal,
    GetAllData,
    SaveEditData,
  };
  return (
    <DataContext.Provider value={DataState}>{children}</DataContext.Provider>
  );
}

export default DataProvider;
