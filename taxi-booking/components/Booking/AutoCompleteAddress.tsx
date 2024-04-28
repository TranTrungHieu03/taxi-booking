"use client";
import { DestinationCoordinatesContext } from "@/context/DestinationCoordinatesContext";
import { SourceCoordinatesContext } from "@/context/SourceCoordinatesContext";
import React, { useContext, useEffect, useState } from "react";
const MAPBOX_RETRIVE_URL =
  "https://api.mapbox.com/search/searchbox/v1/retrieve/";
const sessionToken = "6d5c8ff8-57a4-4dc9-8ab6-1c6f46e5d7b5";

const AutoCompleteAddress = () => {
  const [source, setSource] = useState<string>("");
  const [sourceChange, setSourceChange] = useState<any>(false);
  const [destinationChange, setDestinationChange] = useState<any>(false);
  const [addressList, setAddressList] = useState<any>([]);
  const [destination, setDestination] = useState<string>("");
  const { sourceCoordinates, setSourceCoordinates } = useContext(
    SourceCoordinatesContext
  );
  const { destinationCoordinates, setDestinationCoordinates } = useContext(
    DestinationCoordinatesContext
  );
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAddressList();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [source, destination]);

  const getAddressList = async () => {
    const result = await fetch(
      `/api/search-address?q=${sourceChange ? source : destination}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

    setAddressList(result.data);
  };

  const handleChangeSource = (e: any) => {
    setSource(e.target.value);
    setSourceChange(true);
  };

  const handleChangeSourceDestination = (e: any) => {
    setDestination(e.target.value);
    setDestinationChange(true);
  };

  const onSourceAddressClick = async (item: any) => {
    setSource(item.full_address);
    setAddressList([]);
    setSourceChange(false);
    const result = await fetch(
      `${MAPBOX_RETRIVE_URL}${item.mapbox_id}?session_token=${sessionToken}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
    ).then((res) => res.json());
    setSourceCoordinates({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
  };

  const onDestinationAddressClick = async (item: any) => {
    setDestination(item.full_address);
    setAddressList([]);
    setDestinationChange(false);
    const result = await fetch(
      `${MAPBOX_RETRIVE_URL}${item.mapbox_id}?session_token=${sessionToken}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
    ).then((res) => res.json());
    setDestinationCoordinates({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
  };
  return (
    <div className="w-full">
      <div className="relative ">
        <label htmlFor="from" className="text-gray-400 ">
          Where From?
        </label>
        <input
          name="from"
          type="text"
          className="bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300  "
          value={source}
          onChange={handleChangeSource}
        />
        {addressList.suggestions && sourceChange ? (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-white z-20 ">
            {addressList?.suggestions.map((item: any, index: number) => (
              <h2
                key={index}
                className="p-3 cursor-pointer hover:bg-gray-100 rounded"
                onClick={() => {
                  onSourceAddressClick(item);
                }}
              >
                {item.full_address}
              </h2>
            ))}
          </div>
        ) : null}
      </div>
      <div className="relative">
        <label htmlFor="to" className="text-gray-400 ">
          Where To?
        </label>
        <input
          name="to"
          type="text"
          className="bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300  "
          value={destination}
          onChange={handleChangeSourceDestination}
        />
        {addressList.suggestions && destinationChange ? (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-white z-10">
            {addressList?.suggestions.map((item: any, index: number) => (
              <h2
                key={index}
                className="p-3 cursor-pointer hover:bg-gray-100 rounded"
                onClick={() => {
                  onDestinationAddressClick(item);
                }}
              >
                {item.full_address}
              </h2>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AutoCompleteAddress;
