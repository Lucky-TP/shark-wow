"use client";

import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getCreatorSpecificProjectSummaryStats } from "src/services/apiService/users/getCreatorSpecificProjectSummaryStats";
import { TimeSeriesDataPoint } from "src/interfaces/datas/common";
import LoadingPage from "src/components/global/LoadingPage";

type Props = {
  projectId: string;
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-orange-500 text-white p-2 rounded shadow-lg">
        <p className="font-bold">{`Day ${label}`}</p>
        <p>{`Funding: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

// Helper function to calculate day differences from the first date
const calculateDaysFromFirstDate = (
  data: TimeSeriesDataPoint[]
): TimeSeriesDataPoint[] => {
  if (!data || data.length === 0) return [];

  const firstDate = new Date(data[0].date); // Assuming 'date' is in ISO format
  return data.map((item) => {
    const currentDate = new Date(item.date);
    const timeDiff = currentDate.getTime() - firstDate.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1; // Day 1 for the first date

    return {
      ...item,
      day: dayDiff,
    };
  });
};

export default function GraphProject({ projectId }: Props) {
  const [data, setData] = useState<TimeSeriesDataPoint[]>([]); // สร้าง state สำหรับข้อมูลจาก API
  const [loading, setLoading] = useState(true); // สร้าง state สำหรับแสดง Loading
  const [error, setError] = useState<string | null>(null); // สำหรับ error handling

  // Fetch data from API when component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getCreatorSpecificProjectSummaryStats(projectId); // เรียกใช้ API โดยใช้ projectId
        const processedData = calculateDaysFromFirstDate(result.data.financialTimeSeries); // ประมวลผลข้อมูลให้แสดงผลตามวัน
        setData(processedData); // ตั้งค่า data ที่ได้รับจาก API
        setLoading(false); // ปิดการแสดงผล Loading
      } catch (error) {
        console.error("Error fetching project summary stats:", error);
        setError("Failed to load project summary stats.");
        setLoading(false); // ปิดการแสดงผล Loading เมื่อเกิด error
      }
    }

    fetchData();
  }, [projectId]);

  if (loading) {
    return <LoadingPage />; // แสดงหน้า Loading ขณะดึงข้อมูล
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>; // แสดง error เมื่อมีปัญหาการดึงข้อมูล
  }

  return (
    <div className="w-[65vw] h-full bg-white mt-8 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-extrabold text-gray-700">
          Project Funding
        </h2>
      </div>
      <div className="h-[60vh]">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff7043" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ff7043" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                axisLine={true}
                tickLine={false}
                tick={{ fill: "#888", fontSize: 12 }}
                domain={["dataMin", "dataMax"]}
              />
              <YAxis
                axisLine={true}tick={{ fill: "#888", fontSize: 12 }}
                tickLine={true}
                
                domain={[0, "dataMax + 10"]}
              />
              <Tooltip content={<CustomTooltip />} cursor={true} />
              <Area
                type="monotone"
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
        ) : (
          <div className="text-center text-gray-500 mt-4">
            No Data Available
          </div> // Fallback เมื่อไม่มีข้อมูล
        )}
      </div>
    </div>
  );
}
