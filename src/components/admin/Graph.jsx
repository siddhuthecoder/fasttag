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
  { date: '20 Jun', balance: 100, commission: 80 },
  { date: '21 Jun', balance: 120, commission: 85 },
  { date: '22 Jun', balance: 90, commission: 95 },
  { date: '23 Jun', balance: 80, commission: 120 },
  { date: '24 Jun', balance: 110, commission: 100 },
  { date: '25 Jun', balance: 130, commission: 110 },
  { date: '26 Jun', balance: 100, commission: 90 },
  { date: '27 Jun', balance: 120, commission: 105 },
  { date: '28 Jun', balance: 140, commission: 115 },
  { date: '29 Jun', balance: 100, commission: 85 },
  { date: '30 Jun', balance: 90, commission: 100 },
];

const Graph = () => {
  return (
    <ResponsiveContainer width="100%" className="ms-[-40px] sm:ms-[0px]" height={400}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        // style={{ backgroundColor: '#1a1a1a', padding: '20px' }}
      >
        {/* <CartesianGrid  /> */}
        <XAxis dataKey="date" stroke="#ccc" />
        <YAxis stroke="#ccc" />
        <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555', color: '#fff' }} />
        <Legend wrapperStyle={{ color: '#fff' }} />
        <Line
          type="monotone"
          dataKey="balance"
          stroke="#9b5de5"
          strokeWidth={3}
          dot={{ r: 3 }}
          activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="commission"
          stroke="#f1c40f"
          strokeWidth={3}
          dot={{ r: 3 }}
          activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graph;