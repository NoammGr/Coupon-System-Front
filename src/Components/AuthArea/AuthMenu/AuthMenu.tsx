import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import "./AuthMenu.css";
import CredentialsModel from "../../../Models/CredentialsModel";

function AuthMenu(): JSX.Element {
  const [user, setUser] = useState<CredentialsModel>();

  useEffect(() => {
    setUser(authStore.getState().credentials);
    const unsubscibe = authStore.subscribe(() => {
      setUser(authStore.getState().credentials);
    });
    return () => {
      unsubscibe();
    };
  }, []);

  return (
    <div className="AuthMenu">
      {!user && (
        <div>
          <span>Welcome guest | </span>
          <NavLink to="/login">Login</NavLink>
        </div>
      )}
      {user && (
        <div>
          <span>Welcome {user.email} |</span>
          <NavLink to="/logout">Logout</NavLink>
        </div>
      )}
    </div>
  );
}

export default AuthMenu;
