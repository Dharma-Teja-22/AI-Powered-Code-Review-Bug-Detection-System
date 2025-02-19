import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Visualization = ({ result }) => {
  const [data, setData] = useState([
    { name: "Accuracy", value: 0 },
    { name: "Uniqueness", value: 0 },
    { name: "Code Quality", value: 0 },
    { name: "Bugs Detected", value: 0 },
  ]);

  useEffect(() => {
    if (result?.response) {
      setData([
        { name: "Accuracy", value: Number(result?.response?.accuracy)},
        { name: "Uniqueness", value: Number(result?.response?.uniqueness)},
        { name: "Code Quality", value:Number( result?.response?.code_quality)},
        { name: "Bugs Detected", value: Number(result?.response?.bugs)},
      ]);
    }
  }, [result]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold">Code Review Insights</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default Visualization;
