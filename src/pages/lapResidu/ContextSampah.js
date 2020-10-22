import React, { createContext, useCallback, useState } from "react";
import { db } from "../../util/firebase";

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
  const [c_tanggal, setTanggal] = useState(today);

  const GetDataTgl = async (tgl, tpa) => {
    await db
      .collection("CL_SAMPAHHARI")
      .where("c_tanggal", "==", tgl)
      .where("c_tpa", "==", tpa)
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
      .collection("CL_SAMPAHHARI")
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

  const SampahState = {
    dataSampah,
    GetData,
    GetDataTgl,
    c_tanggal,
    setTanggal,
  };
  return (
    <SampahContext.Provider value={SampahState}>
      {children}
    </SampahContext.Provider>
  );
}

export default SampahProvider;
