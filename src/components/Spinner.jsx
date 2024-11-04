
import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin border-t-4 border-b-4 border-blue-500 rounded-full w-16 h-16"></div>
    </div>
  );
};

export default Spinner;
