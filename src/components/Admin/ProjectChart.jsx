import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Sample data
const data = [
  { name: 'Dự án nhóm', value: 400 },
  { name: 'Dự án cá nhân', value: 300 },
];

// Colors for each section
const COLORS = ['#1B4769', '#228b22'];

// Function to render custom labels
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// ProjectChart component
export default class ProjectChart extends PureComponent {
  render() {
    return (
      <div className="flex flex-col items-center">
        <div className="h-96 w-full p-2 mb-4"> {/* Increase height and reduce padding */}
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius="90%" 
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Custom Legend */}
        <div className="flex gap-4 pb-4">
          {data.map((entry, index) => (
            <div key={`legend-${index}`} className="flex items-center gap-2">
              <div className="w-6 h-6" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
              <span>{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
