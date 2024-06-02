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

  // Reset all rotations when the date is changed
  useEffect(() => {
    setRotations({});
  }, [date]);


  // Fetch all required data when the components first rendered
  useEffect(() => {
    const fetchData = async () => {
      const aircraftsData = await getAircrafts();
      const flightsData = await getFlights();
      setAircrafts(aircraftsData);
      setFlights(flightsData);
    };

    fetchData();
  }, []);

  // Handler that clears the rotation of the selected aircraft, resetting to empty array
  const handleClearRotation = () => {
    if (selectedAircraft) {
      setRotations({
        ...rotations,
        [selectedAircraft.ident]: [],
      });
    }
  };

  // Add a flight to the selected aircraft's rotation
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

  // Handler to select an aicraft
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
    <div className="min-h-screen md:mx-32 lg:mx-40 p-4">
      <div className="flex justify-center">
        <span className="text-2xl border-b-2 px-4 border-orange-400 text-blue-950 font-bold mb-4 text-center ">
          Aircraft Scheduling Hub
        </span>
      </div>
      <div className="flex justify-center">
        <DatePicker date={date} setDate={setDate} />
      </div>
      <div className="flex h-full space-x-4">
        <AircraftList
          aircrafts={aircrafts} // List of aircrafts
          selectedAircraft={selectedAircraft} // Currently selectedAircraft
          onSelect={handleAircraftSelect} // Handler to select aircraft
        />
        <div className="w-1/2 bg-white shadow-md border-2 border-blue-400 rounded-md mx-4">
          <RotationList
            onClear={handleClearRotation} // Clear rotation of selected aircraft
            rotation={rotations[selectedAircraft?.ident] || []} // Rotation list for the selected aircraft
            selectedAircraft={selectedAircraft} // Currently selected aircraft
          />
        </div>
        <FlightsList flights={flights} onSelect={handleFlightSelect} /> 
      </div>
    </div>
  );
}
