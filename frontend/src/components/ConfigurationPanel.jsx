import React, { useState } from "react";

const ConfigurationPanel = () => {
  const [interval, setInterval] = useState(100000);
  // const [isCapturing, setIsCapturing] = useState(false);
  // const handleStartStop = () => {
  //   setIsCapturing(true);
  // };
  

  return (
    <section className="p-4 bg-gray-100">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <label htmlFor="interval" className="block text-gray-700">
            Capture Interval (seconds):
          </label>
          <input
            type="number"
            id="interval"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Change Capturing Interval
        </button>
      </div>
    </section>
  );
};

export default ConfigurationPanel;
