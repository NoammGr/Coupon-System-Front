import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />
        {/* Logout */}
        <Route path="/logout" element={<Logout />} />
        {/* Home */}
        <Route path="/home" element={<Home />} />
        {/* Defulat Element */}
        <Route path="/" element={<Navigate to={"/home"} />} />
        {/* Page not found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default Routing;
