"use client";
import Booking from "@/components/Booking/Booking";
import MapBoxMap from "@/components/Map/MapBoxMap";
import { SourceCoordinatesContext } from "@/context/SourceCoordinatesContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import { useEffect, useState } from "react";
import { DestinationCoordinatesContext } from "./../context/DestinationCoordinatesContext";
import { DirectDrivingContext } from "@/context/DirectDrivingContext";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";

export default function Home() {
  const [userLocation, setUserLocation] = useState<any>();
  const [sourceCoordinates, setSourceCoordinates] = useState<any>();
  const [destinationCoordinates, setDestinationCoordinates] = useState<any>();
  const [directionData, setDirectionData] = useState<any>();
  const [carAmount, setCarAmount] = useState<any>();
  useEffect(() => {
    getUserLocation();
  }, []);
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };
  return (
    <div>
      <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
        <SourceCoordinatesContext.Provider
          value={{ sourceCoordinates, setSourceCoordinates }}
        >
          <DestinationCoordinatesContext.Provider
            value={{ destinationCoordinates, setDestinationCoordinates }}
          >
            <DirectDrivingContext.Provider
              value={{ directionData, setDirectionData }}
            >
              <SelectedCarAmountContext.Provider
                value={{ carAmount, setCarAmount }}
              >
                <div className=" grid grid-cols-1 md:grid-cols-3 ">
                  <Booking />
                  <div className="col-span-2">
                    <MapBoxMap />
                  </div>
                </div>
              </SelectedCarAmountContext.Provider>
            </DirectDrivingContext.Provider>
          </DestinationCoordinatesContext.Provider>
        </SourceCoordinatesContext.Provider>
      </UserLocationContext.Provider>
    </div>
  );
}
