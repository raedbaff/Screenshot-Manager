import React, { useEffect, useState } from "react";
import PhotoContainer from "./PhotoContainer";

const ScreenshotGallery = () => {
  const backendurl = process.env.REACT_APP_BACKEND_URL;
  const [screenshots, setScreenshots] = useState([]);
  const [error, setError] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [expandPhoto, setExpandPhoto] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;
  const handleClickImage = (url) => {
    setExpandPhoto((prev) => !prev);
    setPhotoUrl(url);
  };

  const fetchScreenshots = async () => {
    try {
      const response = await fetch(`${backendurl}/screenshots/1`);
      if (response.status === 404) {
        setLoading(false);
        setScreenshots([]);
      }
      if (response.ok) {
        setLoading(false);
        const data = await response.json();

        setScreenshots(data.screenshots);
        const numberOfPages = Math.ceil(data.screenshots.length / itemsPerPage);
        setPages(numberOfPages);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchScreenshots();
    const intervalid = setInterval(fetchScreenshots, 11000);
    return () => clearInterval(intervalid);
  }, []);

  return (
    <main className="p-4">
      <PhotoContainer
        photoUrl={photoUrl}
        expandPhoto={expandPhoto}
        setExpandPhoto={setExpandPhoto}
      />
      <div className="container mx-auto">
        {Loading ? (
          <div className="text-center text-3xl animate-pulse mt-[10%]">
            Loading your Screenshots ...
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            Error fetching screenshots
          </div>
        ) : screenshots.length === 0 ? (
          <div className="text-3xl text-center font-bold">
            No screenshots found, please take some screenshots using electron
            app to view them here.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Loop through screenshots */}
            {screenshots
              .slice(
                (currentPage - 1) * itemsPerPage,
                (currentPage - 1) * itemsPerPage + itemsPerPage
              )
              .map((screenshot) => (
                <div
                  key={screenshot.id}
                  className="bg-white p-4 rounded-lg shadow-lg"
                >
                  <img
                    onClick={() => {
                      handleClickImage(screenshot.url);
                    }}
                    src={`${screenshot.url}`}
                    alt="Screenshot"
                    className="w-full cursor-pointer h-auto rounded-lg mb-2"
                  />
                </div>
              ))}
          </div>
        )}
        <div className="flex items-center justify-center gap-3 mt-5">
          {Array.from({ length: pages }, (_, index) => (
            <div
              key={index}
              className={`w-7 h-7 text-white flex items-center justify-center cursor-pointer ${
                currentPage === index + 1 ? "bg-blue-400" : "bg-gray-800"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ScreenshotGallery;
