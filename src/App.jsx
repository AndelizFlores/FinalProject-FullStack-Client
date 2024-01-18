// import "./global.css";
import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./context/auth.context";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AllGames from "./pages/AllGames";
import Newfeed from "./pages/Newfeed";
import GameDetailsPage from "./pages/GameDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const { getToken } = useContext(AuthContext);

  const IsLoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to="/login" />;
  };

  const IsLoggedOut = () => {
    return !getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <>
    <div className="coverIMG">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route element={<IsLoggedOut />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<IsLoggedIn />}>
        <Route path="/newfeed" element={<Newfeed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/games" element={<AllGames />} />
          <Route path="games/details/:gameId" element={<GameDetailsPage />} />
        </Route>
      </Routes>
      </div>
    </>
  );
}

export default App;
