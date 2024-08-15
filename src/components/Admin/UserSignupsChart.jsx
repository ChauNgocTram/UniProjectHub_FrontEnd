import React, { useState }  from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: '2024-07-01', users: 5 },
  { date: '2024-07-02', users: 8 },
  { date: '2024-07-03', users: 12 },
  { date: '2024-07-04', users: 15 },
  { date: '2024-07-05', users: 7 },
  { date: '2024-07-06', users: 10 },
  { date: '2024-07-07', users: 9 },
  { date: '2024-08-01', users: 20 },
];

const UserSignupsChart = () => {
  return (
    <div className="h-96 w-full pt-8">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey="users" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserSignupsChart;
