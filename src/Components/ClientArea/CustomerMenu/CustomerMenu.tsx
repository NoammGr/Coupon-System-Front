import { NavLink } from "react-router-dom";
import "./CustomerMenu.css";

function CustomerMenu(): JSX.Element {
  return (
    <div className="CustomerMenu">
      <ul className="Menu-list">
        <li className="Menu-item">
          <NavLink to={"/customer/api/get-customer-coupons"}>
            Get coupons
          </NavLink>
        </li>
        <li className="Menu-item">
          <NavLink to={"/customer/api/get-customer-details"}>
            Customer Details
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default CustomerMenu;
