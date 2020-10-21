import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import * as XLSX from "xlsx";
import { SampahContext } from "./ContextSampah";

function FetchData() {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const { UploudDummy } = useContext(SampahContext);
  // process CSV data
  const processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(
      /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
      );
      if (headers && row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] === '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] === '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
        }
      }
    }
    // prepare columns list from headers
    const columns = headers.map((c) => ({
      name: c,
      selector: c,
    }));
    setColumns(columns);
    console.log("Data awal: ", list);
    const newData = list.map((data) => ({
      c_tanggal: `${data.c_tahun}-${data.c_bulan}-${data.tanggal}`,
      ...data,
    }));
    console.log("Data 1: ", newData);
    setData(newData);
  };

  // handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
      //console.log(data);
    };
    reader.readAsBinaryString(file);
  };

  const onFetchData = () => {
    console.log("Simpan Data1", data);
    UploudDummy(data);
  };

  return (
    <div>
      <h3>Read CSV file</h3>
      <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} />
      <p></p>
      <button onClick={onFetchData}> Uploud Data Excel</button>
      <p></p>
      {/* {JSON.stringify(data)} */}
      <TableContainer>
        <Table aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Tanggal</TableCell>
              <TableCell align="right">Driver</TableCell>
              <TableCell align="right">Nopol</TableCell>
              <TableCell align="right">Kendrn</TableCell>
              <TableCell align="right">Jenis</TableCell>
              <TableCell align="right">Asal</TableCell>
              <TableCell align="right">Rit</TableCell>
              <TableCell align="right">M3</TableCell>
              <TableCell align="right">TON</TableCell>
              <TableCell align="right">TPA</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.c_tanggal}
                </TableCell>
                <TableCell align="right">{row.c_driver}</TableCell>
                <TableCell align="right">{row.c_nopol}</TableCell>
                <TableCell align="right">{row.c_kendaraan}</TableCell>
                <TableCell align="right">{row.c_jenis}</TableCell>
                <TableCell align="right">{row.c_asal}</TableCell>
                <TableCell align="right">{row.n_jmlrit}</TableCell>
                <TableCell align="right">{row.n_volm3}</TableCell>
                <TableCell align="right">{row.n_volton}</TableCell>
                <TableCell align="right">{row.c_tpa}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default FetchData;
