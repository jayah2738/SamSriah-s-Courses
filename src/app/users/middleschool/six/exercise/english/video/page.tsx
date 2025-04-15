"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const SixEngExoVideo = () => {
  const [videos, setVideos] = useState([]);

  // Fetch video list from the backend
  const fetchVideos = async () => {
    const res = await axios.get("http://localhost:5000/videos");
    setVideos(res.data);
  };

  // Delete video
  const deleteVideo = async (filename) => {
    await axios.delete(`http://localhost:5000/videos/${filename}`);
    fetchVideos(); // Refresh video list after deletion
  };

  // Load videos on component mount
  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="grid grid-cols-6 grid-rows-12 p-4">
      {videos.map((video, index) => (
        <div
          key={index}
          className="container mb-4 w-64 rounded-xl bg-gray-500 p-2 shadow-md shadow-white dark:bg-white/50 dark:shadow-white"
        >
          <video
            controls
            controlsList="nodownload"
            className="mb-2 w-64 rounded shadow"
          >
            <source src={video.url} type="video/mp4" />
          </video>
          <div className="flex place-items-center items-center justify-between">
            <h2 className="mb-4 text-xl font-bold">{video.title}</h2>

            <button
              onClick={() => deleteVideo(video.filename)}
              className="rounded-full bg-red-600 px-3 py-2 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SixEngExoVideo;
