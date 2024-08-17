import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data = [
  { date: '1 Jun', balance: 1, commission: 9 },
  { date: '2 Jun', balance: 80, commission: 95 },
  { date: '3 Jun', balance: 85, commission: 90 },
  { date: '4 Jun', balance: 80, commission: 95 },
  { date: '5 Jun', balance: 5, commission: 90 },
  { date: '6 Jun', balance: 80, commission: 95 },
  { date: '7 Jun', balance: 85, commission: 90 },
  { date: '8 Jun', balance: 80, commission: 95 },
  { date: '9 Jun', balance: 85, commission: 90 },
  { date: '10 Jun', balance: 80, commission: 95 },
  { date: '11 Jun', balance: 5, commission: 90 },
  { date: '12 Jun', balance: 80, commission: 95 },
  { date: '13 Jun', balance: 85, commission: 90 },
  { date: '14 Jun', balance: 0, commission: 95 },
  { date: '15 Jun', balance: 85, commission: 90 },
  { date: '16 Jun', balance: 80, commission: 95 },
  { date: '17 Jun', balance: 85, commission: 90 },
  { date: '18 Jun', balance: 80, commission: 95 },
  { date: '19 Jun', balance: 85, commission: 90 },
  { date: '20 Jun', balance: 80, commission: 95 },
  { date: '21 Jun', balance: 5, commission: 90 },
  { date: '22 Jun', balance: 9, commission: 95 },
  { date: '23 Jun', balance: 85, commission: 90 },
  { date: '24 Jun', balance: 80, commission: 95 },
  { date: '25 Jun', balance: 85, commission: 90 },
  { date: '26 Jun', balance: 80, commission: 95 },
  { date: '27 Jun', balance: 85, commission: 90 },
  { date: '28 Jun', balance: 80, commission: 95 },
  { date: '29 Jun', balance: 85, commission: 90 },
  { date: '30 Jun', balance: 8, commission: 95 },
];

const Graph = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="balance"
          stroke="#8884d8"
          strokeWidth={2}
          dot={{ r: 2 }}
        />
        <Line
          type="monotone"
          dataKey="commission"
          stroke="#ffcc00"
          strokeWidth={2}
          dot={{ r: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graph;
