import { DestinationCoordinatesContext } from "@/context/DestinationCoordinatesContext";
import { SourceCoordinatesContext } from "@/context/SourceCoordinatesContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useContext } from "react";
import { Marker } from "react-map-gl";

const Markers = () => {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { sourceCoordinates, setSourceCoordinates } = useContext(
    SourceCoordinatesContext
  );
  const { destinationCoordinates, setDestinationCoordinates } = useContext(
    DestinationCoordinatesContext
  );
  return (
    <div>
      <Marker
        longitude={userLocation?.lng}
        latitude={userLocation?.lat}
        anchor="bottom"
      >
        <img src="/pinmap.png" alt="mapPin" className="h-10 w-10" />
      </Marker>

      {sourceCoordinates && (
        <Marker
          longitude={sourceCoordinates?.lng}
          latitude={sourceCoordinates?.lat}
          anchor="bottom"
        >
          <img src="/pinmap.png" alt="mapPin" className="h-10 w-10" />
        </Marker>
      )}

      {destinationCoordinates && (
        <Marker
          longitude={destinationCoordinates?.lng}
          latitude={destinationCoordinates?.lat}
          anchor="bottom"
        >
          <img src="/pinmap.png" alt="mapPin" className="h-10 w-10" />
        </Marker>
      )}
    </div>
  );
};

export default Markers;
