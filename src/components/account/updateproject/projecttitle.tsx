import React from "react";
import GraphProject from "./GraphProject";
type Props = {
  projectId: string;
};
export default function projecttitle({ projectId }: Props){
  const raised = 10000;
  const goal = 200000;
  const progress = (raised / goal) * 100;

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center p-8 rounded-md">
        {/* Header */}
        <div className="text-center mb-4">
          <p className="text-xl font-bold">
            Now raised <span className="text-3xl text-black">{raised}</span> baht for{" "}
            <span className="text-3xl text-black">{goal}</span> baht
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="relative w-full max-w-4xl h-6 bg-gray-200 rounded-full overflow-hidden mt-4">
          {/* Progress in Concept */}
          <div
            className="absolute h-full bg-[#D16031] rounded-full"
            style={{ width: `${progress >= 30 ? 30 : progress}%` }}
          ></div>

          {/* Progress in Prototype */}
          {progress > 30 && (
            <div
              className="absolute h-full bg-[#D16031] rounded-full"
              style={{ width: `${progress >= 55 ? 55 : progress}%` }}
            ></div>
          )}

          {/* Progress in Production */}
          {progress > 55 && (
            <div
              className="absolute h-full bg-[#D16031] rounded-full"
              style={{ width: `${progress >= 70 ? 70 : progress}%` }}
            ></div>
          )}

          {/* Markers for stages */}
          <div className="absolute left-[30%] h-full w-[1px] bg-black"></div>
          <div className="absolute left-[55%] h-full w-[1px] bg-black"></div>
          <div className="absolute left-[70%] h-full w-[1px] bg-black"></div>
        </div>

        {/* Stage Labels */}
        <div className="flex justify-between w-full max-w-4xl mt-2 text-sm font-semibold">
          <div className="text-center w-1/3">
            <p>Concept</p>
            <p>30%</p>
          </div>
          <div className="text-center w-1/3">
            <p>Prototype</p>
            <p>55%</p>
          </div>
          <div className="text-center w-1/3">
            <p>Production</p>
            <p>70%</p>
          </div>
        </div>

        {/* Arrow Indicator */}
        {progress > 55 && (
          <div className="mt-4 flex justify-center items-center space-x-2">
            <span className="text-black font-semibold text-lg">55%</span>
            <div className="relative">
              <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-black"></div>
            </div>
          </div>
        )}
      </div>

      {/* Graph Project Container */}
      <div className="flex flex-col items-center justify-center w-[80vw] px-[4vw] mb-8">
        <GraphProject projectId={projectId} />
      </div>
    </>
  );
};


