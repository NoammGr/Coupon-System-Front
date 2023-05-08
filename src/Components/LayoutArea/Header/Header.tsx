import "./Header.css";
import Logo from "../../../Assets/Images/coupon-system-logo2.png";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import { NavLink } from "react-router-dom";
function Header(): JSX.Element {
  return (
    <div className="Header">
      <NavLink to={"/home"}>
        <img src={Logo} alt="Coupon system logo" />
      </NavLink>
      <AuthMenu />
    </div>
  );
}

export default Header;
