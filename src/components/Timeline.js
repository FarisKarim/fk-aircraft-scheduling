

const Timeline = ({ rotation, totalFlightTime }) => {
  const totalSecondsInDay = 86400;
  const turnaroundTime = 20 * 60; // in seconds
  const utilizationPercentage = (totalFlightTime / 86400) * 100;


  const segments = [];
  let lastEndTime = 0;

  rotation.forEach((flight) => {
    // Idle time segment
    if (flight.departuretime > lastEndTime) {
      segments.push({
        type: "idle",
        start: lastEndTime,
        end: flight.departuretime,
      });
    }

    // Flight segment
    segments.push({
      type: "flight",
      start: flight.departuretime,
      end: flight.arrivaltime,
    });

    // Turnaround time segment
    if (flight.arrivaltime + turnaroundTime < totalSecondsInDay) {
      segments.push({
        type: "turnaround",
        start: flight.arrivaltime,
        end: flight.arrivaltime + turnaroundTime,
      });
    }

    lastEndTime = flight.arrivaltime + turnaroundTime;
  });

  // Add final idle segment if there's time left in the day
  if (lastEndTime < totalSecondsInDay) {
    segments.push({
      type: "idle",
      start: lastEndTime,
      end: totalSecondsInDay,
    });
  }

  return (
    <> 
     <p className="text-black text-center">Daily Utilization: {utilizationPercentage.toFixed(2)}%</p>
      <div className="relative h-14 w-full border-blue-800 border-4 rounded-lg mt-2">
        {segments.map((segment, index) => (
          <div
            key={index}
            className={`absolute h-full ${
              segment.type === "flight"
                ? "bg-green-500 border-green-800 border-2"
                : segment.type === "turnaround"
                ? "bg-red-500 border-red-800 border-2"
                : "bg-gray-700"
            }`}
            style={{
              left: `${(segment.start / totalSecondsInDay) * 100}%`,
              width: `${
                ((segment.end - segment.start) / totalSecondsInDay) * 100
              }%`,
            }}
          ></div>
        ))}
      </div>
      <div className="mt-1 flex relative justify-between">
        <div>00:00</div>
        <div>12:00</div>
        <div>24:00</div>
      </div>
    </>
  );
};

export default Timeline;
