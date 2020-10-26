import React, { createContext, useCallback, useState } from "react";
import app, {
  Firebase,
  storage,
  LocalServer,
  Develop,
} from "../../util/firebase";
import moment from "moment";

const db = app.firestore();
//setting jika menggunakan emulator firestore
if (LocalServer) {
  db.settings({ host: "localhost:8080", ssl: false });
}

export const DataContext = createContext();

function DataProvider({ children }) {
  const [semuaData, setSemuaData] = useState([]);

  const SaveData = async (newData) => {
    if (Develop) {
      console.log("STEP : SAVE TPST", newData);
    }
    let tglserver1 = new Date(
      Firebase.firestore.Timestamp.now().seconds * 1000
    );
    let tglserver = moment(tglserver1).format("YYYY-MM-DD");

    return await db.collection("CL_TPST").add({
      createdAt: tglserver,
      ...newData,
    });
  };

  const simpanFileImg1 = async (fileygdisimpan, id) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`TPST/${fileygdisimpan.name}`);
    await fileRef.put(fileygdisimpan);
    db.collection("CL_TPST")
      .doc(id)
      .update({
        c_fileImg1: await fileRef.getDownloadURL(),
      });
  };

  const CekNamaFile = async (fileygdicek) => {
    const storageRef = storage.ref();
    var listRef = storageRef.child("TPST");
    let data = [];
    return await listRef
      .list()
      .then(function (res) {
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          data.push(itemRef.name);
        });
        //setFileCari(data);
      })
      .then(() => console.log(data))
      .then(() => {
        const found = data.find((elemen) => elemen === fileygdicek.name);
        if (found) {
          console.log("Ketemu");
          return true;
        } else {
          console.log("Tidak Ketemu");
          return false;
        }
      })
      .catch(function (error) {
        // Uh-oh, an error occurred!
      });
  };

  const GetAllData = useCallback(async () => {
    await db
      .collection("CL_TPST")
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        //console.log("Render List Effect :", data);
        setSemuaData(data);
      })
      .catch((error) => console.error("Error Get Data :", error));
  }, []);

  const DeleteData = async (id) => {
    if (Develop) {
      console.log("STEP : DELETE DATA", id);
    }
    await db
      .collection("CL_TPST")
      .doc(id)
      .delete()
      .then(() => GetAllData());
  };

  const SaveEditData = async (newData) => {
    if (Develop) {
      console.log("STEP : SAVE EDIT DATA", newData);
    }
    const { id, c_alamat, c_kontak, c_noHP, c_keterangan } = newData;

    await db
      .collection("CL_TPST")
      .doc(id)
      .update({
        c_alamat,
        c_kontak,
        c_noHP,
        c_keterangan,
      })
      .then(() => GetAllData())
      .catch((error) => console.error("Error Save Data :", error));
  };


  const DataState = {
    semuaData,
    simpanFileImg1,
    SaveData,
    CekNamaFile,
    GetAllData,
    DeleteData,
    SaveEditData
  };
  return (
    <DataContext.Provider value={DataState}>{children}</DataContext.Provider>
  );
}

export default DataProvider;
