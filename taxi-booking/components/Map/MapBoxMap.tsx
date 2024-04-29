"use client";
import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useContext, useEffect, useRef } from "react";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./Markers";
import { DestinationCoordinatesContext } from "@/context/DestinationCoordinatesContext";
import { SourceCoordinatesContext } from "@/context/SourceCoordinatesContext";
import { DirectDrivingContext } from "@/context/DirectDrivingContext";
import MapBoxRoute from "./MapBoxRoute";
import DistanceTime from "./DistanceTime";

const MAPBOX_DRIVING_ENDPOINT =
  "https://api.mapbox.com/directions/v5/mapbox/driving/";
const sessionToken = "6d5c8ff8-57a4-4dc9-8ab6-1c6f46e5d7b5";

const MapBoxMap = () => {
  const mapRef = useRef<any>();
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { sourceCoordinates, setSourceCoordinates } = useContext(
    SourceCoordinatesContext
  );
  const { destinationCoordinates, setDestinationCoordinates } = useContext(
    DestinationCoordinatesContext
  );
  const { directionData, setDirectionData } = useContext(DirectDrivingContext);

  useEffect(() => {
    if (sourceCoordinates) {
      mapRef.current?.flyTo({
        center: [sourceCoordinates?.lng, sourceCoordinates?.lat],
        duration: 2500,
      });
    }
  }, [sourceCoordinates]);

  useEffect(() => {
    if (destinationCoordinates) {
      mapRef.current?.flyTo({
        center: [destinationCoordinates?.lng, destinationCoordinates?.lat],
        duration: 2500,
      });
    }

    if (sourceCoordinates && destinationCoordinates) {
      getDirectionRoute();
    }
  }, [destinationCoordinates]);

  const getDirectionRoute = async () => {
    const result = await fetch(
      `${MAPBOX_DRIVING_ENDPOINT}${sourceCoordinates.lng},${sourceCoordinates.lat}
      ;${destinationCoordinates.lng},${destinationCoordinates.lat}
      ?overview=full&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

    setDirectionData(result);
  };
  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Map</h2>
      <div className="rounded-lg overflow-hidden">
        {userLocation ? (
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation.lng,
              latitude: userLocation.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 450, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers />
            {directionData && (
              <MapBoxRoute
                coordinates={directionData?.routes[0]?.geometry?.coordinates}
              />
            )}
          </Map>
        ) : null}
      </div>
      <div className="absolute bottom-[50px] z-20 right-5 hidden md:block">
        <DistanceTime/>
      </div>
    </div>
  );
};

export default MapBoxMap;
