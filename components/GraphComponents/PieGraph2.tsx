import React, { useState } from 'react'
//@ts-ignore
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#FF6719',
  '#0DFFEF',
  '#264A5E',
  '#5E14C4',
  '#C4740A',
  '#999156',
  '#FF1C8E',
]

const PieGraph2: React.FC<{
  data: Array<{ name: string; value: number }>
  value: string
  nameKey: string
}> = ({ data, value, nameKey }) => {
  return (
    <PieChart width={300} height={300}>
      <Pie
        dataKey={value}
        isAnimationActive={true}
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label
        nameKey={nameKey}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip label={value} />
    </PieChart>
  )
}
export default PieGraph2
