import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Text
} from 'recharts';

const Graph = ({ data }) => {
  const isEmpty = !data || data.length === 0;

  return (
    <ResponsiveContainer width="100%" className="ms-[-40px] sm:ms-[0px]" height={400}>
      {isEmpty ? (
        <Text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#ccc">
          No payments found for the selected time period  
        </Text>
      ) : (
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
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
      )}
    </ResponsiveContainer>
  );
};

export default Graph;
