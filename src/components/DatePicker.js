import { useState } from 'react';
import { format, addDays } from 'date-fns';

const DatePicker = ({ date, setDate }) => {
  const increaseDate = () => {
    setDate(addDays(date, 1));
  };

  const decreaseDate = () => {
    setDate(addDays(date, -1));
  };

  return (
    <div className="flex items-center space-x-4 mb-4">
      <button
        onClick={decreaseDate}
        className="px-3 bg-white border-blue-400 border rounded-md hover:bg-green-300"
      >
        &lt;
      </button>
      <span className="text-xl">{format(date, 'yyyy-MM-dd')}</span>
      <button
        onClick={increaseDate}
        className="px-3 bg-white border-blue-400 border rounded-lg hover:bg-green-300"
      >
        &gt;
      </button>
    </div>
  );
};

export default DatePicker;
