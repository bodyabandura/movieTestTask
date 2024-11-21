import "./App.css";
import BottomImage from "./components/images/BottomImage";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateMovie from "./pages/MovieForm";
import MovieList from "./pages/MovieList";
import SignIn from "./pages/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="flex justify-center  bg-background min-h-screen relative px-6 py-20 md:p-[120px] ">
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <MovieList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies/create"
            element={
              <ProtectedRoute>
                <CreateMovie />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies/edit"
            element={
              <ProtectedRoute>
                <CreateMovie isEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <div className="text-white text-heading-2 text-center">
                404 - Page Not Found
              </div>
            }
          />
        </Routes>
      </Router>
      <BottomImage />
    </div>
  );
}

export default App;
