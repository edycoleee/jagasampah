import React, { createContext, useCallback, useState } from "react";
import app, { LocalServer, Develop } from "../../util/firebase";

export const SampahContext = createContext();

const db = app.firestore();
//setting jika menggunakan emulator firestore
if (LocalServer) {
  db.settings({ host: "localhost:8080", ssl: false });
}

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
  const [dataBulanan, setDataBulanan] = useState([]);
  const [labelChart, setLabelChart] = useState([]);
  const [sampahChart, setSampahChart] = useState([]);
  const [c_tanggal, setTanggal] = useState(today);

  const GetDataBln = async (tahun, bulan, c_tpa) => {
    console.log(tahun, bulan, c_tpa);
    await db
      .collection("CL_SAMPAHHARI")
      .where("c_bulan", "==", bulan)
      .where("c_tpa", "==", c_tpa)
      .where("c_tahun", "==", tahun)
      .get()
      .then((snapshot) => {
        //ketemu data tanggal
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const AllTgl = [...new Set(data.map((item) => item.c_tanggal))];
        //console.log("Render Tanggal :", AllTgl);

        const uploudData = async (tgl) => {
          const dataFilter = data.filter((item) => item.c_tanggal === tgl);
          //console.log(dataFilter);
          const calcTon = (data) => {
            return data.reduce((total, item) => {
              const volton = parseFloat(item.n_volton);
              return total + volton;
            }, 0);
          };
          const TotTon = calcTon(dataFilter);

          const calcRit = (data) => {
            return data.reduce((total, item) => {
              const volrit = parseFloat(item.n_jmlrit);
              return total + volrit;
            }, 0);
          };
          const RitRit = calcRit(dataFilter);

          const calcM3 = (data) => {
            return data.reduce((total, item) => {
              const volm3 = parseFloat(item.n_volm3);
              //console.log(volm3);
              return total + volm3;
            }, 0);
          };
          const M3M3 = calcM3(dataFilter);
          if (Develop) {
            console.log("STEP item : ", tgl, M3M3, RitRit, TotTon);
          }
          const newData = {
            c_tanggal: tgl,
            n_volton: TotTon,
            n_jmlrit: RitRit,
            n_volm3: M3M3,
            c_tpa,
            c_bulan: bulan,
            c_tahun: tahun,
          };
          arr.push(newData);
          xlabel.push(tgl);
          ylabel.push(TotTon.toFixed(2));
        };
        let arr = [];
        let xlabel = [];
        let ylabel = [];
        AllTgl.sort(function (a, b) {
          return parseInt(a.substr(8, 2)) - parseInt(b.substr(8, 2));
        }).map((tgl, index) => uploudData(tgl));
        if (Develop) {
          console.log("DATA", arr);
        }
        //setDataBulanan(arr);
        setLabelChart(xlabel);
        setSampahChart(ylabel);
        setDataSampah(data);
        return arr;
      })
      .then((REKAP) => {
        if (REKAP.length === 0) {
          if (Develop) {
            console.log("STEP DATA KOSONG");
          }
        } else {
          if (Develop) {
            console.log("STEP DATA DISIMPAN");
          }
          db.collection("CL_REKAPTPA")
            .doc(`${tahun}${bulan}${c_tpa}`)
            .set({ REKAP });
        }
      })
      .then(() => LihatDataTpa(tahun, bulan, c_tpa))
      .catch((error) => console.error("Error Get Data :", error));
  };

  const GetAllDataBln = () => {};

  const LihatDataTpa = async (tahun, bulan, c_tpa) => {
    await db
      .collection("CL_REKAPTPA")
      .doc(`${tahun}${bulan}${c_tpa}`)
      .get()
      .then((doc) => {
        if (!doc.exists) return console.log("Document Not Found : ");
        console.log("get Document : ", doc.data());
        const data = {
          id: doc.id,
          ...doc.data(),
        };
        const { REKAP } = doc.data();
        setDataBulanan(REKAP);
        if (Develop) {
          console.log("STEP GET DATA", data, REKAP);
        }
        console.log("STEP FINAL DATA", dataBulanan, REKAP);
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
        //console.log("Render List Effect :", data);
        setDataSampah(data);
      })
      .catch((error) => console.error("Error Get Data :", error));
  }, [c_tanggal]);

  const SampahState = {
    dataSampah,
    GetData,
    GetDataBln,
    c_tanggal,
    setTanggal,
    GetAllDataBln,
    dataBulanan,
    labelChart,
    sampahChart,
    LihatDataTpa,
  };
  return (
    <SampahContext.Provider value={SampahState}>
      {children}
    </SampahContext.Provider>
  );
}

export default SampahProvider;
