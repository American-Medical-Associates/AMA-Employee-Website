import React from 'react'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

const LineGraph: React.FC<{
  data: any
  setDay: any
  setWeek: any
  setMonth: any
  setYear: any
  setAll: any
  day: boolean
  week: boolean
  month: boolean
  year: boolean
  all: boolean
  curentTimeFrame: any
  toolTipText: string
  totalForTimeFrame: number
}> = ({
  data,
  setDay,
  setWeek,
  setMonth,
  setYear,
  setAll,
  day,
  week,
  month,
  year,
  all,
  curentTimeFrame,
  totalForTimeFrame,
  toolTipText,
}) => {
  return (
    <div>
      <div className="flex flex-row items-center justify-center">
        {data && (
          <LineChart
            width={900}
            height={500}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Items" stroke="#8884d8" />
            <Line type="monotone" dataKey="Patients" stroke="#82ca9d" />
          </LineChart>
        )}
        <div>
          <h6>
            <span className="text-blue-500">{curentTimeFrame}</span> Total:
            <span className="text-blue-500">{totalForTimeFrame}</span>
          </h6>
        </div>
      </div>
      <div>
        {/* <Segment
          numberOfOptionsMax5={3}
          textOptionOne="Day"
          textOptionTwo="Month"
          textOptionThree="All"
          setOptionOne={setDay}
          setOptionTwo={setMonth}
          setOptionThree={setAll}
          optionOne={day}
          optionTwo={month}
          optionThree={all}
        /> */}
      </div>
    </div>
  )
}
export default LineGraph
