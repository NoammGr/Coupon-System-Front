/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import "./Logout.css";

function Logout(): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    authService.logout();
    notificationService.success("logout successfully !");
    navigate("/home");
  }, []);

  return null;
}

export default Logout;
