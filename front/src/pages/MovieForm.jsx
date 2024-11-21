import React, { useState } from "react";
import DownloadImage from "../components/images/DownloadImage";
import Input from "../components/Input";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";

export default function MovieForm({
  isEdit = false,
  initialValues = {},
  onSubmit,
}) {
  const location = useLocation();
  const movieData = location.state?.movie || initialValues;
  const navigate = useNavigate();

  const [title, setTitle] = useState(movieData.title || "");
  const [publishingYear, setPublishingYear] = useState(
    movieData.publishingYear || ""
  );
  const [poster, setPoster] = useState(movieData.poster || "");
  const [image, setImage] = useState(
    movieData.poster ? `http://18.175.253.236:5000/${movieData.poster}` : null
  );

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImage(URL.createObjectURL(file));
      setPoster(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSubmit = async () => {
    if (isEdit && (!movieData || !movieData._id)) {
      console.error("Movie data is missing or incomplete for edit mode");
      return;
    }
    if (!title || !publishingYear) {
      console.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("publishingYear", publishingYear);
    if (poster instanceof File) {
      formData.append("poster", poster);
    }

    try {
      const token =
        sessionStorage.getItem("accessToken") ||
        localStorage.getItem("accessToken");
      if (!token) {
        console.error("User is not signed in.");
        return;
      }

      const url = isEdit
        ? `http://18.175.253.236:5000/movies/${movieData._id}`
        : "http://18.175.253.236:5000/movies";
      const method = isEdit ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        if (onSubmit) onSubmit(result);
        navigate("/movies");
      } else {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        return;
      }
    } catch (error) {
      console.error(
        isEdit ? "Error updating movie:" : "Error creating movie:",
        error
      );
    }
  };

  return (
    <div className="w-full h-full">
      <h2 className="text-heading-3 md:text-heading-2 mb-20 md:mb-[120px] text-white">
        {isEdit ? "Edit" : "Create a new movie"}
      </h2>

      <div className="flex flex-col md:flex-row md:gap-10 lg:gap-[127px]">
        <div className="md:hidden">
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Publishing year"
            value={publishingYear}
            onChange={(e) => setPublishingYear(e.target.value)}
            className="md:w-[60%]"
          />
        </div>

        <div
          className="w-full h-[50vh] lg:max-w-[473px] mb-10 bg-white bg-opacity-10 border-[2px] border-dashed border-white rounded-[10px] flex flex-col items-center justify-center cursor-pointer"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {image ? (
            <img
              src={image}
              alt="Uploaded"
              className="w-full h-full object-cover rounded-[10px]"
            />
          ) : (
            <>
              <DownloadImage />
              <p className="text-white text-body-small">Drop an image here</p>
            </>
          )}
        </div>

        <div className="w-full h-full">
          <div className="xl:w-[60%]">
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="max-md:hidden"
            />
            <Input
              type="number"
              placeholder="Publishing year"
              value={publishingYear}
              onChange={(e) => setPublishingYear(e.target.value)}
              className="md:w-[60%] max-md:hidden"
            />

            <div className="flex gap-4">
              <Button
                text="Cancel"
                variant="secondary"
                onClick={() => navigate(-1)}
              />
              <Button text="Submit" variant="primary" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
