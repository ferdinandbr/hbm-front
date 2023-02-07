import React, { useState, useEffect } from "react";
import './Chart.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws');
    socket.onopen = () => {
      console.log("Connection ok");
    };
    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(prevData => {
        const updatedData = [...prevData, newData];
        if (updatedData.length > 20) {
          updatedData.shift();
        }
        return updatedData;
      });
    };
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="chart-container">
      <LineChart
        width={900}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8edd65" dot = {false} />
      </LineChart>
    </div> 
  );
};

export default Chart;