import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { SampahContext } from "./ContextSampah";
import { Develop } from "../../util/firebase";

function ChartSampah() {
  const { dataBulanan } = useContext(SampahContext);
  const [labelChart, setLabelChart] = useState([]);
  const [sampahChart, setSampahChart] = useState([]);

  useEffect(() => {
    //if(dataBulanan.length !== 0){

    console.log("EFFECT1 ", dataBulanan.length, dataBulanan);
    let xlabel = [];
    let ylabel = [];

    dataBulanan.map((data) => {
      const { n_volton } = data;
      xlabel.push(data.c_tanggal);
      ylabel.push(parseFloat(n_volton).toFixed(2));
      //always return some value
      return data;
    });

    setLabelChart(xlabel);
    setSampahChart(ylabel);
    if (Develop) {
      console.log("CHART EFFECT", xlabel, ylabel);
    }

    //}
  }, [dataBulanan]);

  //     useEffect(() => {
  //  console.log(labelChart,sampahChart);
  //     },[labelChart,sampahChart])

  const data = {
    //labels: ["January", "February", "March", "April", "May", "June", "July"],
    labels: labelChart,
    datasets: [
      {
        label: "DATA SAMPAH (TON)",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        //data: [65, 59, 80, 81, 56, 55, 40],
        data: sampahChart,
      },
    ],
  };

  return (
    <div>
      {/* {JSON.stringify(dataChart)} */}
      <h2>Grafik Sampah Bulanan</h2>
      <Line data={data} />
    </div>
  );
}

export default ChartSampah;
