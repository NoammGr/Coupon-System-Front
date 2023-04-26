import "./Header.css";
import Logo from "../../../Assets/Images/coupon-system-logo2.png";
function Header(): JSX.Element {
  return (
    <div className="Header">
      <img src={Logo} alt="Coupon system logo" />
    </div>
  );
}

export default Header;
