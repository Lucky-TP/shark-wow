"use client"

import React from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { TimeSeriesDataPoint } from 'src/interfaces/datas/common'
import { CreatorSummaryStats } from 'src/interfaces/datas/user'



interface ProjectViewerProps  {
  data?: TimeSeriesDataPoint[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-orange-500 text-white p-2 rounded shadow-lg">
        <p className="font-bold">{`Date ${label}`}</p>
        <p>{`Total Amount: ${payload[0].value}`}</p>
      </div>
    )
  }
  return null
}

// Mock data
const mockData: TimeSeriesDataPoint[] = [
  { date: '9-20-2024', totalAmount: 2800, transactionCount: 1},
  { date: '9-21-2024', totalAmount: 3500, transactionCount: 2 }
]

export default function DashBoard({ data = mockData }: ProjectViewerProps) {

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
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#888', fontSize: 12 }}
              // ticks={[1, 5, 10, 15, 20, 25, 30]}
              domain={['dataMin', 'dataMax']}
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
              dataKey="totalAmount" 
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