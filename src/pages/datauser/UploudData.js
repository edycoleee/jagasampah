import React, { useState } from "react";
import app, { Firebase, LocalServer } from "../../util/firebase";
import {
  DATAKECAMATAN,
  Bonang,
  Demak,
  Dempet,
  Gajah,
  Guntur,
  Karanganyar,
  Karangawen,
  Karangtengah,
  Kebonagung,
  Mijen,
  Mranggen,
  Sayung,
  Wedung,
  Wonosalam,
} from "../../util/dbKelurahan";

const db = app.firestore();
//setting jika menggunakan emulator firestore
if (LocalServer) {
  db.settings({ host: "localhost:8080", ssl: false });
}

function UploudData() {
  const [loading, setLoading] = useState(false)
  const onUploudData = async () => {
    setLoading(true)
    //Simpan Kecamatan
    const simpanKecamatan = async (Kecamatan) => {
      await db
        .collection("CL_KECAMATAN")
        .doc(Kecamatan)
        .set({
          DESA: Firebase.firestore.FieldValue.arrayUnion("PILIH"),
        })
        .then(() => {
          //console.log(Kecamatan);
        });
    };
    const kecamatanloop = async (KelKecamatan) => {
      for (const k of KelKecamatan) {
        await simpanKecamatan(k);
      }
    };
    await kecamatanloop(DATAKECAMATAN);

    //Simpan Desa
    const simpanDesa = async (desa,NamaDesa) => {
      await db
        .collection("CL_KECAMATAN")
        .doc(NamaDesa)
        .update({
          DESA: Firebase.firestore.FieldValue.arrayUnion(desa),
        })
        .then(() => {
          //console.log(desa);
        });
    };
    const desaloop = async (KelDesa,NamaDesa) => {
      for (const d of KelDesa) {
        await simpanDesa(d,NamaDesa);
      }
    };
    await desaloop(Bonang, "Bonang");
    await desaloop(Demak, "Demak");
    await desaloop(Dempet,"Dempet");
    await desaloop(Gajah,"Gajah");
    await desaloop(Guntur,"Guntur");
    await desaloop(Karanganyar,"Karanganyar");
    await desaloop(Karangawen,"Karangawen");
    await desaloop(Karangtengah,"Karangtengah");
    await desaloop(Kebonagung,"Kebonagung");
    await desaloop(Mijen,"Mijen");
    await desaloop(Mranggen,"Mranggen");
    await desaloop(Sayung,"Sayung");
    await desaloop(Wedung,"Wedung");
    await desaloop(Wonosalam,"Wonosalam");
    await console.log("SELESAI SIMPAN");
    await setLoading(false)
  };

  return (
    <div>
      <h3>Uploud Data Kecamatan dan Kelurahan</h3>
      <button onClick={onUploudData} disabled={loading}>UPLOUD</button>
    </div>
  );
}

export default UploudData;
