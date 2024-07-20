import React from "react";

const PhotoContainer = ({ photoUrl, expandPhoto, setExpandPhoto }) => {
  return (
    expandPhoto && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 h-screen w-screen flex flex-col items-center justify-center">
        <div className="relative bg-white h-[90%] w-[90%]">
          <button
            className="absolute top-2 right-1 bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => setExpandPhoto(false)}
          >
            Close
          </button>
          <img src={photoUrl} className="h-full w-full object-contain" alt="screenshot" />
        </div>
      </div>
    )
  );
};

export default PhotoContainer;
