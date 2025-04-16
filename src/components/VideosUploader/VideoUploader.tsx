"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoUploadAndGallery = () => {
  type VideoType = {
    // filename: string;
    url: string;
    // title: string;
  };
  const [videoFile, setVideoFile] = useState(null);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [title, setTitle] = useState("");

  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!videos) {
      alert("Please select a video ");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);
    // formData.append("title", title);


    await axios.post("http://localhost:5000/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        setUploadProgress(percent);
      },
    });

    await axios.post("http://localhost:5000/upload", formData);

    alert("Video uploaded successfully!");
    setVideos(null);
  };
  return (
    <div className="mx-auto max-w-3xl p-4">
      <form
        onSubmit={handleUpload}
        className="mb-6 rounded-lg p-5 shadow-md shadow-black/60"
      >
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
          className="mb-2 rounded-full"
        />
        {/* <input
        type="text"
        placeholder="Enter video title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded mb-2 block w-full"
      /> */}
        <button
          type="submit"
          className="rounded-full bg-amber-500 px-4 py-2 text-white"
        >
          Upload Video
        </button>
      </form>
      {uploadProgress > 0 && (
        <div className="mt-2 h-6 text-center w-full rounded-full bg-gray-300">
          <div
            className="h-6 rounded-full bg-green-600 text-xl text-red-500 text-center font-bold "
            style={{ width: `${uploadProgress}%` }}
          >{uploadProgress.toString()}% </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {videos.map((video, index) => (
          <video key={index} controls className="w-full rounded shadow">
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ))}
      </div>
    </div>
  );
};

export default VideoUploadAndGallery;
