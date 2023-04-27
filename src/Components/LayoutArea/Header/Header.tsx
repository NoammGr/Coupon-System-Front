import "./Header.css";
import Logo from "../../../Assets/Images/coupon-system-logo2.png";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
function Header(): JSX.Element {
  return (
    <div className="Header">
      <img src={Logo} alt="Coupon system logo" />
      <AuthMenu />
    </div>
  );
}

export default Header;
