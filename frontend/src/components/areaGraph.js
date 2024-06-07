import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import { curveCardinal } from "d3-shape";

const cardinal = curveCardinal.tension(0.2);

export default function Chart({Data}) {

 

console.log(Data);

  return (
    <AreaChart
      width={950}
      height={400}
      data={Data}
    >
      <XAxis
        dataKey="month"
        tick={{ fill: "#ffffff" }}
      />
      <YAxis tick={{ fill: "#ffffff" }} />
      <Tooltip />
      <Area
        type={cardinal}
        dataKey="Profit"
        stroke="#db0000"
        strokeWidth={2}
        fill="#00b3ff"
        fillOpacity={0.7}
      />
      <Area
        dataKey="Invs"
        stroke="#3cb371"
        fill="#8884d8"
        fillOpacity={0.3}
      />
      
    </AreaChart>
  );
}
