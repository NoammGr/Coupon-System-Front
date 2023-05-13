import "./Menu.css";
import { authStore } from "../../../Redux/AuthState";
import { useEffect, useState } from "react";
import CredentialsModel from "../../../Models/CredentialsModel";
import ClientTypeModel from "../../../Models/ClientTypeModel";
import { NavLink } from "react-router-dom";
import AdminMenu from "../../ClientArea/AdminMenu/AdminMenu";
import CompanyMenu from "../../ClientArea/CompanyMenu/CompanyMenu";
import CustomerMenu from "../../ClientArea/CustomerMenu/CustomerMenu";

function Menu(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [user, setUser] = useState<CredentialsModel>();

  useEffect(() => {
    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().credentials);
    });
    return unsubscribe;
  }, []);

  const toggleMenu = (): void => {
    console.log("User state updated:", user);
    console.log(user);
    setIsOpen(!isOpen);
  };

  return (
    <div className="Menu">
      <button className="Menu-button" onClick={toggleMenu}>
        <p className="Menu-name">Menu</p>
      </button>
      {isOpen && (
        <ul className="Menu-list">
          {user && (
            <>
              {user.clientType === ClientTypeModel.ADMIN && <AdminMenu />}
              {user.clientType === ClientTypeModel.COMPANY && <CompanyMenu />}
              {user.clientType === ClientTypeModel.CUSTOMER && <CustomerMenu />}
            </>
          )}
          {!user && (
            <>
              <li className="Menu-item">
                <NavLink to={"/home"}>Home</NavLink>
              </li>
              <li className="Menu-item">
                <NavLink to={"/coupons"}>Coupons</NavLink>
              </li>
              <li className="Menu-item">
                <NavLink to={"/about-us"}>About</NavLink>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default Menu;
