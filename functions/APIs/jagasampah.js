const { db, today } = require("../util/admin");

exports.getTotalResiduTPA = (request, response) => {
  db.collection("CL_SAMPAHHARI")
    .where("c_tanggal", "==", today)
    .get()
    .then((data) => {
      let sampahharian = [];
      data.forEach((doc) => {
        sampahharian.push({
          todoId: doc.id,
          n_volton: doc.data().n_volton,
        });
      });
      const calcTon = (dataSampah) => {
        return dataSampah.reduce((total, item) => {
          const volton = parseFloat(item.n_volton);
          return total + volton;
        }, 0);
      };

      const jumlahValue = calcTon(sampahharian);
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
            todoId: doc.id,
            n_volton: doc.data().n_volton,
          });
        });
        const calcTon = (dataSampah) => {
          return dataSampah.reduce((total, item) => {
            const volton = parseFloat(item.n_volton);
            return total + volton;
          }, 0);
        };
  
        const jumlahValue = calcTon(sampahharian);
        const jumlahData = sampahharian.length;
        const status = "ok";
        return response.json({sampahharian, jumlahData, jumlahValue, today, status });
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
      });
  };