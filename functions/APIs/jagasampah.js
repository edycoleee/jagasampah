const { db, today } = require("../util/admin");
//calculation TPA
const HitTotal = (dataSampah, hitung) => {
  return dataSampah.reduce((total, item) => {
    const voltotal = parseFloat(hitung);
    return total + voltotal;
  }, 0);
};
//calculation 3R
const HitPlastik = (dataSampah) => {
  return dataSampah.reduce((total,item) => {
    const voltotal = parseFloat(item.n_plastik);
    return total + voltotal;
  }, 0);
};

const HitOrganik = (dataSampah) => {
  return dataSampah.reduce((total,item) => {
    const voltotal = parseFloat(item.n_organik);
    return total + voltotal;
  }, 0);
};

const HitKertas = (dataSampah) => {
  return dataSampah.reduce((total,item) => {
    const voltotal = parseFloat(item.n_kertas);
    return total + voltotal;
  }, 0);
};

const HitKaca = (dataSampah) => {
  return dataSampah.reduce((total,item) => {
    const voltotal = parseFloat(item.n_kaca);
    return total + voltotal;
  }, 0);
};

const HitKaret = (dataSampah) => {
  return dataSampah.reduce((total,item) => {
    const voltotal = parseFloat(item.n_karet);
    return total + voltotal;
  }, 0);
};

const HitKayu = (dataSampah) => {
  return dataSampah.reduce((total,item) => {
    const voltotal = parseFloat(item.n_kayu);
    return total + voltotal;
  }, 0);
};

const HitLain = (dataSampah) => {
  return dataSampah.reduce((total,item) => {
    const voltotal = parseFloat(item.n_lain);
    return total + voltotal;
  }, 0);
};


exports.getTotalResiduTPA = (request, response) => {
  db.collection("CL_SAMPAHHARI")
    .where("c_tanggal", "==", today)
    .get()
    .then((data) => {
      let sampahharian = [];
      data.forEach((doc) => {
        sampahharian.push({
          id: doc.id,
          n_volton: doc.data().n_volton,
        });
      });

      const jumlahValue = HitTotal(sampahharian, "item.n_volton");
      const jumlahData = sampahharian.length;
      const status = "ok";
      return response.json({ jumlahData, jumlahValue, today, status });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.getAllResiduTPA = (request, response) => {
  db.collection("CL_SAMPAHHARI")
    .where("c_tanggal", "==", today)
    .get()
    .then((data) => {
      let sampahharian = [];
      data.forEach((doc) => {
        sampahharian.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      const jumlahValue = HitTotal(sampahharian, "item.n_volton");
      const jumlahData = sampahharian.length;
      const status = "ok";
      return response.json({
        sampahharian,
        jumlahData,
        jumlahValue,
        today,
        status,
      });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.getAll3R =async (request, response) => {
  await db.collection("CL_SAMPAH3R")
    .where("c_tanggal", "==", today)
    .get()
    .then((data) => {
      let sampahharian = [];
      data.forEach((doc) => {
        sampahharian.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      const jmlPlastik = HitPlastik(sampahharian);
      const jmlOrganik =  HitOrganik(sampahharian);
      const jmlKertas = HitKertas(sampahharian);
      const jmlKaca = HitKaca(sampahharian);
      const jmlKaret = HitKaret(sampahharian);
      const jmlKayu = HitKayu(sampahharian);
      const jmlLain = HitLain(sampahharian);

      const jumlahData = sampahharian.length;
      const status = "ok";
      return response.json({
        sampah3R : sampahharian,
        jumlahData,
        jmlPlastik,
        jmlOrganik,
        jmlKertas,
        jmlKaca,
        jmlKaret,
        jmlKayu,
        jmlLain,
        today,
        status,
      });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};
