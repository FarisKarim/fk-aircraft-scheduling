import Timeline from "@/components/Timeline";

const RotationList = ({ rotation, onClear, selectedAircraft }) => {
  // Calculate total flight time
  const totalFlightTime = rotation.reduce((total, flight) => {
    return total + (flight.arrivaltime - flight.departuretime);
  }, 0);

  // Calculate utilization percentage
  return (
    <div className="p-4 bg-white max-h-[70vh] overflow-y-auto rounded-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Rotation</h2>
      <div className="flex justify-end">
        {(rotation.length > 0) && (
          <button
            className="bg-red-500 text-white justify-end px-2 w-20 rounded-lg my-2 -mt-4 hover:bg-red-700"
            onClick={onClear}
          >
            Clear all
          </button>
        )}
      </div>
      <div>
        {rotation.map((flight, index) => (
          <div
            key={index}
            className="p-4 border-black border-2 rounded-md mb-2"
          >
            <div className="flex">
              <p className="text-center m-auto underline decoration-2 decoration-blue-800">
                Flight: {flight.ident}
              </p>
            </div>
            <div className="flex justify-between sm:text-xl">
              <p>{flight.origin} </p>
              <p className="text-xl">➔</p>
              <p>{flight.destination}</p>
            </div>
            <p className="text-center">
              {flight.readable_departure} - {flight.readable_arrival}
            </p>
          </div>
        ))}
      </div>
      {selectedAircraft && (
        <Timeline rotation={rotation} totalFlightTime={totalFlightTime} />
      )}
      <div className="flex justify-end">
        {/* Show save button when there is a flight added to the rotation. */}
        {rotation.length > 0 && (
          // <button className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">
          //   Clear
          // </button>
          <button className="mt-6 bg-green-600 text-white px-2 w-20 rounded-lg hover:bg-blue-700">
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default RotationList;
