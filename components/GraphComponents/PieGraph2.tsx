import React, { useState } from 'react'
//@ts-ignore
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts'

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
      />

      <Tooltip label={value} />
    </PieChart>
  )
}
export default PieGraph2
