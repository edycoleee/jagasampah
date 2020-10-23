import React from "react";
import app, { Firebase, LocalServer } from "../../util/firebase";
import {
  //DATAKECAMATAN,
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
  const onUploudData = () => {
    console.log("Uploud Data");
    // DATAKECAMATAN.map((item, index) => {
    //   console.log(item)

    // })

    
    db.collection("CL_KECAMATAN")
      .doc("Bonang")
      .set({
        DESA: Firebase.firestore.FieldValue.arrayUnion("PILIH"),
      })
      .then(() => {
        let Desaku = () =>
          Bonang.map((item, index) => {
            console.log(item);
            db.collection("CL_KECAMATAN")
              .doc("Bonang")
              .update({
                DESA: Firebase.firestore.FieldValue.arrayUnion(item),
              })
              .then(() => {
                console.log("Document Add Array");
              });
          });
        Desaku();
      });

    db.collection("CL_KECAMATAN")
      .doc("Demak")
      .set({
        DESA: Firebase.firestore.FieldValue.arrayUnion("PILIH"),
      })
      .then(() => {
        let Desaku = () =>
          Demak.map((item, index) => {
            console.log(item);
            db.collection("CL_KECAMATAN")
              .doc("Demak")
              .update({
                DESA: Firebase.firestore.FieldValue.arrayUnion(item),
              })
              .then(() => {
                console.log("Document Add Array");
              });
          });
        Desaku();
      });

    db.collection("CL_KECAMATAN")
      .doc("Dempet")
      .set({
        DESA: Firebase.firestore.FieldValue.arrayUnion("PILIH"),
      })
      .then(() => {
        let Desaku = () =>
          Dempet.map((item, index) => {
            console.log(item);
            db.collection("CL_KECAMATAN")
              .doc("Dempet")
              .update({
                DESA: Firebase.firestore.FieldValue.arrayUnion(item),
              })
              .then(() => {
                console.log("Document Add Array");
              });
          });
        Desaku();
      });

    db.collection("CL_KECAMATAN")
      .doc("Gajah")
      .set({
        DESA: Firebase.firestore.FieldValue.arrayUnion("PILIH"),
      })
      .then(() => {
        let Desaku = () =>
          Gajah.map((item, index) => {
            console.log(item);
            db.collection("CL_KECAMATAN")
              .doc("Gajah")
              .update({
                DESA: Firebase.firestore.FieldValue.arrayUnion(item),
              })
              .then(() => {
                console.log("Document Add Array");
              });
          });
        Desaku();
      });

    db.collection("CL_KECAMATAN")
      .doc("Guntur")
      .set({
        DESA: Firebase.firestore.FieldValue.arrayUnion("PILIH"),
      })
      .then(() => {
        let Desaku = () =>
          Guntur.map((item, index) => {
            console.log(item);
            db.collection("CL_KECAMATAN")
              .doc("Guntur")
              .update({
                DESA: Firebase.firestore.FieldValue.arrayUnion(item),
              })
              .then(() => {
                console.log("Document Add Array");
              });
          });
        Desaku();
      });

    db.collection("CL_KECAMATAN")
      .doc("Karanganyar")
      .set({
        DESA: Firebase.firestore.FieldValue.arrayUnion("PILIH"),
      })
      .then(() => {
        let Desaku = () =>
          Karanganyar.map((item, index) => {
            console.log(item);
            db.collection("CL_KECAMATAN")
              .doc("Karanganyar")
              .update({
                DESA: Firebase.firestore.FieldValue.arrayUnion(item),
              })
              .then(() => {
                console.log("Document Add Array");
              });
          });
        Desaku();
      });

    db.collection("CL_KECAMATAN")
      .doc("Karangawen")
      .set({
        DESA: Firebase.firestore.FieldValue.arrayUnion("PILIH"),
      })
      .then(() => {
        let Desaku = () =>
          Karangawen.map((item, index) => {
            console.log(item);
            db.collection("CL_KECAMATAN")
              .doc("Karangawen")
              .update({
                DESA: Firebase.firestore.FieldValue.arrayUnion(item),
              })
              .then(() => {
                console.log("Document Add Array");
              });
          });
        Desaku();
      });

    db.collection("CL_KECAMATAN")
      .doc("Karangtengah")
      .set({
        DESA: Firebase.firestore.FieldValue.arrayUnion("PILIH"),
      })
      .then(() => {
        let Desaku = () =>
          Karangtengah.map((item, index) => {
            console.log(item);
            db.collection("CL_KECAMATAN")
              .doc("Karangtengah")
              .update({
                DESA: Firebase.firestore.FieldValue.arrayUnion(item),
              })
              .then(() => {
                console.log("Document Add Array");
              });
          });
        Desaku();
      });

    db.collection("CL_KECAMATAN")
      .doc("Kebonagung")
      .set({
        DESA: Firebase.firestore.FieldValue.arrayUnion("PILIH"),
      })
      .then(() => {
        let Desaku = () =>
          Kebonagung.map((item, index) => {
            console.log(item);
            db.collection("CL_KECAMATAN")
              .doc("Kebonagung")
              .update({
                DESA: Firebase.firestore.FieldValue.arrayUnion(item),
              })
              .then(() => {
                console.log("Document Add Array");
              });
          });
        Desaku();
      });

    db.collection("CL_KECAMATAN")
      .doc("Mijen")
      .set({
        DESA: Firebase.firestore.FieldValue.arrayUnion("PILIH"),
      })
      .then(() => {
        let Desaku = () =>
          Mijen.map((item, index) => {
            console.log(item);
            db.collection("CL_KECAMATAN")
              .doc("Mijen")
              .update({
                DESA: Firebase.firestore.FieldValue.arrayUnion(item),
              })
              .then(() => {
                console.log("Document Add Array");
              });
          });
        Desaku();
      });

    db.collection("CL_KECAMATAN")
      .doc("Mranggen")
      .set({
        DESA: Firebase.firestore.FieldValue.arrayUnion("PILIH"),
      })
      .then(() => {
        let Desaku = () =>
          Mranggen.map((item, index) => {
            console.log(item);
            db.collection("CL_KECAMATAN")
              .doc("Mranggen")
              .update({
                DESA: Firebase.firestore.FieldValue.arrayUnion(item),
              })
              .then(() => {
                console.log("Document Add Array");
              });
          });
        Desaku();
      });

    db.collection("CL_KECAMATAN")
      .doc("Sayung")
      .set({
        DESA: Firebase.firestore.FieldValue.arrayUnion("PILIH"),
      })
      .then(() => {
        let Desaku = () =>
          Sayung.map((item, index) => {
            console.log(item);
            db.collection("CL_KECAMATAN")
              .doc("Sayung")
              .update({
                DESA: Firebase.firestore.FieldValue.arrayUnion(item),
              })
              .then(() => {
                console.log("Document Add Array");
              });
          });
        Desaku();
      });

    db.collection("CL_KECAMATAN")
      .doc("Wedung")
      .set({
        DESA: Firebase.firestore.FieldValue.arrayUnion("PILIH"),
      })
      .then(() => {
        let Desaku = () =>
          Wedung.map((item, index) => {
            console.log(item);
            db.collection("CL_KECAMATAN")
              .doc("Wedung")
              .update({
                DESA: Firebase.firestore.FieldValue.arrayUnion(item),
              })
              .then(() => {
                console.log("Document Add Array");
              });
          });
        Desaku();
      });

    db.collection("CL_KECAMATAN")
      .doc("Wonosalam")
      .set({
        DESA: Firebase.firestore.FieldValue.arrayUnion("PILIH"),
      })
      .then(() => {
        let Desaku = () =>
          Wonosalam.map((item, index) => {
            console.log(item);
            db.collection("CL_KECAMATAN")
              .doc("Wonosalam")
              .update({
                DESA: Firebase.firestore.FieldValue.arrayUnion(item),
              })
              .then(() => {
                console.log("Document Add Array");
              });
          });
        Desaku();
      });
  };

  return (
    <div>
      <h3>Uploud Data Kecamatan</h3>
      <button onClick={onUploudData}>UPLOUD</button>
      <h3>Uploud Data Kelurahan</h3>
      <button>UPLOUD</button>
    </div>
  );
}

export default UploudData;
