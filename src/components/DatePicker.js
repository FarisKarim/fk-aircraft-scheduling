import { useState } from "react";
import { format, addDays } from "date-fns";

const DatePicker = ({ date, setDate }) => {
  // Increase date by 1
  const increaseDate = () => {
    setDate(addDays(date, 1));
  };
  // Function to decrease date by 1
  const decreaseDate = () => {
    setDate(addDays(date, -1));
  };

  return (
    <div className="flex items-center space-x-4 mb-4">
      <button
        onClick={decreaseDate} // Left arrow decreases date
        className="px-2 bg-white border-blue-400 border rounded-md hover:bg-green-300"
      >
        &lt;
      </button>
      <span className="text-lg">{format(date, "yyyy-MM-dd")}</span>
      <button
        onClick={increaseDate} // Right arrow increases date
        className="px-2 bg-white border-blue-400 border rounded-lg hover:bg-green-300"
      >
        &gt;
      </button>
    </div>
  );
};

export default DatePicker;
