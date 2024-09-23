"use client"

import React from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type DataPoint = {
  day: number
  value: number
}

type ProjectViewerProps = {
  data?: DataPoint[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-orange-500 text-white p-2 rounded shadow-lg">
        <p className="font-bold">{`Day ${label}`}</p>
        <p>{`Value: ${payload[0].value}`}</p>
      </div>
    )
  }
  return null
}

// Mock data
const mockData: DataPoint[] = [
  { day: 1, value: 2800 },
  { day: 2, value: 2500 },
  { day: 3, value: 1300 },
  { day: 4, value: 2300 },
  { day: 5, value: 3000 },
  { day: 6, value: 2300 },
  { day: 7, value: 1400 },
  { day: 8, value: 3300 },
  { day: 9, value: 1300 },
  { day: 10, value: 2500 },
  { day: 11, value: 3300 },
  { day: 12, value: 1300 },
  { day: 13, value: 2200 },
  { day: 14, value: 3300 },
  { day: 15, value: 1800 },
  { day: 16, value: 2300 },
  { day: 17, value: 3300 },
  { day: 18, value: 1100 },
  { day: 19, value: 3300 },
  { day: 20, value: 1300 },
  { day: 21, value: 3300 },
  { day: 22, value: 4300 },
  { day: 23, value: 2900 },
  { day: 24, value: 1300 },
  { day: 25, value: 2400 },
  { day: 26, value: 3300 },
  { day: 27, value: 4300 },
  { day: 28, value: 1800 },
  { day: 29, value: 2300 },
  { day: 30, value: 5300 },
  { day: 31, value: 2800 },
]

export default function DashBoard({ data = mockData}: ProjectViewerProps) {
  if (data.length === 0) {
    return (
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700 text-center">No data available</h2>
      </div>
    )
  }

  return (
    <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Project Viewer</h2>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff7043" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ff7043" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#888', fontSize: 12 }}
              ticks={[1, 5, 10, 15, 20, 25, 30]}
              domain={[1, 31]}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#888', fontSize: 12 }}
              domain={[0, 'dataMax + 100']}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={true}
              position={{ y: 0 }}
            />
            <Area 
              type="natural" 
              dataKey="value" 
              stroke="#ff7043" 
              fillOpacity={1} 
              fill="url(#colorValue)" 
              connectNulls
              activeDot={{
                r: 6,
                fill: "#ff7043",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}