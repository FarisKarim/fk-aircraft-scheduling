import { useState } from "react";

const AircraftList = ({ aircrafts, selectedAircraft, onSelect }) => {
  const [expandedAircraft, setExpandedAircraft] = useState(null);

  // Toggle expanded state of aircraft
  const toggleExpand = (aircraft) => {
    // Check if the aircraft has been expanded
    if (expandedAircraft === aircraft) {
      // If so, collapse it by setting the expanded state to null
      setExpandedAircraft(null);
    } else {
      // Otherwise, expand the clicked aircraft
      setExpandedAircraft(aircraft);
    }
  };

  return (
    <div className="w-1/4 p-4 bg-white shadow-md max-h-[70vh] border-2 border-black overflow-y-auto rounded-md">
      <h2 className="text-xl font-semibold mb-4">Aircrafts</h2>
      {aircrafts.map((aircraft) => (
        <div
          key={aircraft.ident}
          onClick={() => onSelect(aircraft)}
          className={`cursor-pointer mb-2 p-2 border rounded-md hover:bg-blue-200 ${
            selectedAircraft?.ident === aircraft.ident ? "bg-green-200 border-2 border-black" : ""
          }`}
        >
          <div className="flex flex-wrap justify-between items-center">
            <div>{aircraft.ident}</div>
            <button
              onClick={() => toggleExpand(aircraft)}
              className="border border-blue-500 px-2 rounded-lg hover:bg-blue-400 text-xs"
            >
              {expandedAircraft === aircraft ? "Show Less" : "Show More"}
            </button>
          </div>
          {expandedAircraft === aircraft && (
            <div className="mt-2 text-sm">
              <p>Type: {aircraft.type}</p>
              <p>Base: {aircraft.base}</p>
              <p>Economy Seats: {aircraft.economySeats}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AircraftList;
