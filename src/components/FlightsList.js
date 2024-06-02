const FlightsList = ({ flights, onSelect }) => {
  return (
    <div className="w-1/4 p-4 bg-white shadow-md rounded-md max-h-[70vh] overflow-y-auto border-2 border-blue-400">
      <div className="border-white border-b-8">
        <h2 className="text-xl font-semibold text-center">Flights</h2>
        <h3 className="mb-4 text-sm text-center">Add flights from here</h3>
        {flights.map((flight) => (
          <div
            key={flight.id}
            onClick={() => onSelect(flight)}
            className="cursor-pointer mb-2 p-2 border border-black rounded-md hover:bg-blue-200"
          >
            <p>{flight.id}</p>
            <p>
              {flight.origin} ➔ {flight.destination}
            </p>
            <p>
              {flight.readable_departure} - {flight.readable_arrival}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightsList;
