import { DirectDrivingContext } from "@/context/DirectDrivingContext";
import React, { useContext } from "react";

const DistanceTime = () => {
  const { directionData, setDirectionData } = useContext(DirectDrivingContext);

  return (
    directionData && (
      <div className="bg-yellow-500 p-3">
        <h2 className="text-yellow-100 opacity-100 text-md ">
          Distance: 
          <span className="font-bold mr-3 text-black">
            {(directionData?.routes[0]?.distance * 0.0062137).toFixed(2)} Miles
          </span>
          Duration: 
          <span className="font-bold  text-black">
            {(directionData?.routes[0]?.duration / 60).toFixed(2)} Mins
          </span>
        </h2>
      </div>
    )
  );
};

export default DistanceTime;
