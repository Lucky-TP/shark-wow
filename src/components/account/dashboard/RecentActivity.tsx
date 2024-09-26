import React from 'react';
import { useCreatorSummary } from 'src/context/creatorDashboard/useCreatorSummary';


// Utility function to convert date string
function formatDateAndTime(isoDateString: string | number | Date) {
  const dateObj = new Date(isoDateString);

  // Extract the date in YYYY-MM-DD format
  const date = dateObj.toISOString().split('T')[0];

  // Extract the time in HH:MM:SS format
  const time = dateObj.toISOString().split('T')[1].slice(0, 8);

  return { date, time };
}

export default function RecentActivity() {
  const { creatorSummary, onGettingSummary } = useCreatorSummary();

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Recent Activities</h2>
      </div>
      <div className="h-[300px] overflow-y-auto pr-4 custom-scrollbar">
        <div className="w-full">
          {creatorSummary?.data?.recentContributions && creatorSummary.data.recentContributions.length > 0 ? (creatorSummary.data.recentContributions.map((data, index) => {
            const { date, time } = formatDateAndTime(data.date);
            return (
              <div key={index} className="flex items-center justify-between py-4 border-b last:border-b-0">
              <div className="flex-1">
                <p className="font-medium text-gray-500">{data.userPreview?.username}</p>
              </div>
              <div className="flex-1 text-right">
                <p className="font-medium text-gray-500">{data.amount}</p>
              </div>
              <div className="flex-1 text-right">
              <p className="text-sm text-gray-500">{date}</p>
              </div>
              <div className="flex-1 text-right">
                <p className="text-sm text-gray-500">{time}</p>
              </div>
              <div className="flex-1 text-right">
                <p className="text-sm text-gray-500">{data.action}</p>
              </div>
            </div>
            )
          })) : (
                <div className='text-center text-gray-500 mt-4'>
                  No Data Available
                </div>)}
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}

