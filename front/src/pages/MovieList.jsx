import React, { useEffect, useState } from "react";
import AddCircleImage from "../components/images/AddCircleImage";
import LogoutImage from "../components/images/Logout";
import MovieCard from "../components/MovieCard";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const MOVIES_PER_PAGE = 8;

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [size, setSize] = useState(window.innerWidth > 640 ? 32 : 24);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const fetchMovies = async (page) => {
    setIsLoading(true);
    const token =
      sessionStorage.getItem("accessToken") ||
      localStorage.getItem("accessToken");

    if (!token) {
      console.error("User is not signed in.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://13.40.190.253:5000/movies?page=${page}&limit=${MOVIES_PER_PAGE}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const moviesArray = Array.isArray(data.data)
          ? data.data
          : data.movies || [];

        setMovies(moviesArray);
        setTotalPages(
          data.totalPages || Math.ceil(data.totalCount / MOVIES_PER_PAGE)
        );
      } else {
        const errorData = await response.json();
        console.error("Failed to fetch movies:", errorData.message);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth > 640 ? 32 : 24);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-heading-2 text-white">Loading...</p>
        </div>
      ) : movies.length > 0 ? (
        <>
          <div className="flex justify-between mb-[120px]">
            <div className="flex">
              <h2 className="text-heading-3 md:text-heading-2 text-white me-3">
                My movies
              </h2>
              <AddCircleImage
                className="cursor-pointer"
                onClick={() => navigate("/movies/create")}
                size={size}
              />
            </div>

            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => handleLogout()}
            >
              <p className="text-body-regular text-white max-sm:hidden">
                Logout
              </p>
              <LogoutImage />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 bg-background-light">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                imageUrl={`http://13.40.190.253:5000/${movie.poster}`}
                title={movie.title}
                year={movie.publishingYear}
                onClick={() => navigate(`/movies/edit`, { state: { movie } })}
              />
            ))}
          </div>

          <div className="flex justify-center items-center mt-[120px] mb-[80px] md:mb-[109px]">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-white text-body-regular pe-[16px]"
            >
              Prev
            </button>
            <div className="text-white text-body-regular gap-2 flex">
              <div className="py-1 px-3 bg-primary rounded-md w-8 h-8">
                {currentPage}
              </div>
              <div className="py-1 px-3 bg-card rounded-md w-8 h-8">
                {totalPages}
              </div>
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-white text-body-regular ps-[16px]"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-[60vh] overflow-hidden">
          <div className="flex flex-col items-center justify-center">
            <p className="text-heading-2 text-white pb-10 text-center">
              Your movie list is empty
            </p>
            <Button
              variant="primary"
              text="Add a new movie"
              className="w-fit"
              onClick={() => navigate("/movies/create")}
            />
          </div>
        </div>
      )}
    </div>
  );
}
