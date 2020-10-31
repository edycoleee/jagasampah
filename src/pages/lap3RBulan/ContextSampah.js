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

  const [idBank, setIdBank] = useState("");
  const [nmBank, setNmBank] = useState("");
  const [alamatBank, setAlamatBank] = useState("");
  //Notify state
const [notify, setNotify] = useState({
  isOpen: false,
  message: "",
  type: "",
});

  const GetDataBln = async (tahun, bulan, idBank) => {
    console.log(tahun, bulan, idBank);
    await db
      .collection("CL_SAMPAH3R")
      .where("c_bulan", "==", bulan)
      .where("idBank", "==", idBank)
      .where("c_tahun", "==", tahun)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        ///console.log("Render List Effect :", data);
        const AllTgl = [...new Set(data.map((item) => item.c_tanggal))];

        const uploudData = async (tgl) => {
          const dataFilter = data.filter((item) => item.c_tanggal === tgl);
          //console.log(dataFilter);

          const calcPlastic = (dataSampah) => {
            return dataSampah.reduce((total, item) => {
              const volrit = parseFloat(item.n_plastik);
              return total + volrit;
            }, 0);
          };
          const jmlPlastik = calcPlastic(dataFilter);

          const calcOrganik = (dataSampah) => {
            return dataSampah.reduce((total, item) => {
              const volm3 = parseFloat(item.n_organik);
              //console.log(volm3);
              return total + volm3;
            }, 0);
          };
          const jmlOrganik = calcOrganik(dataFilter);

          const calcKertas = (dataSampah) => {
            return dataSampah.reduce((total, item) => {
              const volm3 = parseFloat(item.n_kertas);
              //console.log(volm3);
              return total + volm3;
            }, 0);
          };
          const jmlKertas = calcKertas(dataFilter);

          const calcKaca = (dataSampah) => {
            return dataSampah.reduce((total, item) => {
              const volm3 = parseFloat(item.n_kaca);
              //console.log(volm3);
              return total + volm3;
            }, 0);
          };
          const jmlKaca = calcKaca(dataFilter);

          const calcKaret = (dataSampah) => {
            return dataSampah.reduce((total, item) => {
              const volm3 = parseFloat(item.n_karet);
              //console.log(volm3);
              return total + volm3;
            }, 0);
          };
          const jmlKaret = calcKaret(dataFilter);

          const calcKayu = (dataSampah) => {
            return dataSampah.reduce((total, item) => {
              const volm3 = parseFloat(item.n_kayu);
              //console.log(volm3);
              return total + volm3;
            }, 0);
          };
          const jmlKayu = calcKayu(dataFilter);

          const calcLain = (dataSampah) => {
            return dataSampah.reduce((total, item) => {
              const volm3 = parseFloat(item.n_lain);
              //console.log(volm3);
              return total + volm3;
            }, 0);
          };
          const jmlLain = calcLain(dataFilter);

          const TotTon =
            jmlPlastik +
            jmlOrganik +
            jmlKertas +
            jmlKaca +
            jmlKaret +
            jmlKayu +
            jmlLain;

          if (Develop) {
            console.log("STEP item : ", tgl, jmlPlastik, jmlOrganik, TotTon);
          }
          const newData = {
            c_tanggal: tgl,
            n_volton: TotTon,
            n_plastik: jmlPlastik,
            n_organik: jmlOrganik,
            n_kertas: jmlKertas,
            n_kaca: jmlKaca,
            n_karet: jmlKaret,
            n_kayu: jmlKayu,
            n_lain: jmlLain,
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
          db.collection("CL_REKAP3R").doc(`${tahun}${bulan}${idBank}`).set({ REKAP });
        }
      })
      .then(() => LihatDataTpaFilter(tahun, bulan,idBank))
      .catch((error) => console.error("Error Get Data :", error));
  };

  const GetAllDataBln = async (tahun, bulan) => {
    await db
      .collection("CL_SAMPAH3R")
      .where("c_bulan", "==", bulan)
      .where("c_tahun", "==", tahun)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        ///console.log("Render List Effect :", data);
        const AllTgl = [...new Set(data.map((item) => item.c_tanggal))];

        const uploudData = async (tgl) => {
          const dataFilter = data.filter((item) => item.c_tanggal === tgl);
          //console.log(dataFilter);

          const calcPlastic = (dataSampah) => {
            return dataSampah.reduce((total, item) => {
              const volrit = parseFloat(item.n_plastik);
              return total + volrit;
            }, 0);
          };
          const jmlPlastik = calcPlastic(dataFilter);

          const calcOrganik = (dataSampah) => {
            return dataSampah.reduce((total, item) => {
              const volm3 = parseFloat(item.n_organik);
              //console.log(volm3);
              return total + volm3;
            }, 0);
          };
          const jmlOrganik = calcOrganik(dataFilter);

          const calcKertas = (dataSampah) => {
            return dataSampah.reduce((total, item) => {
              const volm3 = parseFloat(item.n_kertas);
              //console.log(volm3);
              return total + volm3;
            }, 0);
          };
          const jmlKertas = calcKertas(dataFilter);

          const calcKaca = (dataSampah) => {
            return dataSampah.reduce((total, item) => {
              const volm3 = parseFloat(item.n_kaca);
              //console.log(volm3);
              return total + volm3;
            }, 0);
          };
          const jmlKaca = calcKaca(dataFilter);

          const calcKaret = (dataSampah) => {
            return dataSampah.reduce((total, item) => {
              const volm3 = parseFloat(item.n_karet);
              //console.log(volm3);
              return total + volm3;
            }, 0);
          };
          const jmlKaret = calcKaret(dataFilter);

          const calcKayu = (dataSampah) => {
            return dataSampah.reduce((total, item) => {
              const volm3 = parseFloat(item.n_kayu);
              //console.log(volm3);
              return total + volm3;
            }, 0);
          };
          const jmlKayu = calcKayu(dataFilter);

          const calcLain = (dataSampah) => {
            return dataSampah.reduce((total, item) => {
              const volm3 = parseFloat(item.n_lain);
              //console.log(volm3);
              return total + volm3;
            }, 0);
          };
          const jmlLain = calcLain(dataFilter);

          const TotTon =
            jmlPlastik +
            jmlOrganik +
            jmlKertas +
            jmlKaca +
            jmlKaret +
            jmlKayu +
            jmlLain;

          if (Develop) {
            console.log("STEP item : ", tgl, jmlPlastik, jmlOrganik, TotTon);
          }
          const newData = {
            c_tanggal: tgl,
            n_volton: TotTon,
            n_plastik: jmlPlastik,
            n_organik: jmlOrganik,
            n_kertas: jmlKertas,
            n_kaca: jmlKaca,
            n_karet: jmlKaret,
            n_kayu: jmlKayu,
            n_lain: jmlLain,
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
          db.collection("CL_REKAP3R").doc(`${tahun}${bulan}`).set({ REKAP });
        }
      })
      .then(() => LihatDataTpa(tahun, bulan))
      .catch((error) => console.error("Error Get Data :", error));
  };

  const LihatDataTpa = async (tahun, bulan) => {
    setDataBulanan([]);
    await db
      .collection("CL_REKAP3R")
      .doc(`${tahun}${bulan}`)
      .get()
      .then((doc) => {
        if (!doc.exists) return setNotify({
          isOpen: true,
          message: "Data Belum Ada",
          type: "error",
        });
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

  const LihatDataTpaFilter = async (tahun, bulan,idBank) => {
    setDataBulanan([]);
    await db
      .collection("CL_REKAP3R")
      .doc(`${tahun}${bulan}${idBank}`)
      .get()
      .then((doc) => {
        if (!doc.exists) return setNotify({
          isOpen: true,
          message: "Data Belum Ada",
          type: "error",
        });
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

  const getDataBank = async () => {
    if (Develop) {
      console.log("STEP : GET DATA BANKSAMPAH");
    }
    let data = [];
    await db
      .collection("CL_BANKSAMPAH")
      .get()
      .then((snapshot) => {
        data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
    return data;
  };


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
    LihatDataTpaFilter,
    idBank,
    setIdBank,
    nmBank,
    setNmBank,
    alamatBank,
    setAlamatBank,
    getDataBank,
    notify, setNotify
  };
  return (
    <SampahContext.Provider value={SampahState}>
      {children}
    </SampahContext.Provider>
  );
}

export default SampahProvider;
