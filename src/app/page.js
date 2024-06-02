"use client";

import { useState, useEffect } from "react";
import { getAircrafts, getFlights } from "../api/getData";
import AircraftList from "@/components/AircraftList";
import FlightsList from "@/components/FlightsList";
import RotationList from "@/components/RotationList";
import DatePicker from "@/components/DatePicker";

export default function Home() {
  const [aircrafts, setAircrafts] = useState([]);
  const [flights, setFlights] = useState([]);
  const [selectedAircraft, setSelectedAircraft] = useState(null);
  const [rotations, setRotations] = useState({});

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setRotations({});
  }, [date]);

  useEffect(() => {
    const fetchData = async () => {
      const aircraftsData = await getAircrafts();
      const flightsData = await getFlights();
      setAircrafts(aircraftsData);
      setFlights(flightsData);
    };

    fetchData();
  }, []);

  const handleClearRotation = () => {
    if (selectedAircraft) {
      setRotations({
        ...rotations,
        [selectedAircraft.ident]: [],
      });
    }
  };

  const handleFlightSelect = (flight) => {
    if (
      selectedAircraft &&
      validateFlightAddition(rotations[selectedAircraft.ident] || [], flight)
    ) {
      const newRotation = [
        ...(rotations[selectedAircraft.ident] || []),
        flight,
      ];
      setRotations({
        ...rotations,
        [selectedAircraft.ident]: newRotation,
      });
    }
  };

  const handleAircraftSelect = (aircraft) => {
    setSelectedAircraft(aircraft);
  };

  // Validate if the flight can be added to the rotation
  const validateFlightAddition = (rotation, flight) => {
    // If the rotation array is empty, it can obviously be added to the rotation and not cause any conflicts
    if (rotation.length === 0) {
      return true;
    }
    // Check the last flight in the rotation, we want to check its destination time and compare it to the current departure time.
    const lastFlight = rotation[rotation.length - 1];
    const turnaroundTime = 20 * 60; // 20 minutes in seconds
    if (
      // Last flight's destination must be the "flight in question's" origin
      lastFlight.destination === flight.origin &&
      // The flight in question must depart after the last flight's arrival time + 20 minutes
      flight.departuretime >= lastFlight.arrivaltime + turnaroundTime
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Aircraft Scheduling Hub
      </h1>
      <div className="flex justify-center">
        <DatePicker date={date} setDate={setDate} />
      </div>
      <div className="flex h-full space-x-4">
        <AircraftList
          aircrafts={aircrafts}
          selectedAircraft={selectedAircraft}
          onSelect={handleAircraftSelect}
        />
        <div className="w-1/2 bg-white shadow-md border-2 border-black rounded-md mx-4">
          <RotationList
            onClear={handleClearRotation}
            rotation={rotations[selectedAircraft?.ident] || []}
            selectedAircraft = {selectedAircraft}
          />
        </div>
        <FlightsList flights={flights} onSelect={handleFlightSelect} />
      </div>
    </div>
  );
}
