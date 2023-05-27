import { NavLink } from "react-router-dom";
import "./CustomerMenu.css";

function CustomerMenu(): JSX.Element {
  return (
    <div className="CustomerMenu">
      <ul className="Menu-list">
        <li className="Menu-item">
          <NavLink to={"/customer/api/browse-coupons"}>Browse coupons</NavLink>
        </li>
        <li className="Menu-item">
          <NavLink to={"/customer/api/my-coupons"}>My coupons</NavLink>
        </li>
        <li className="Menu-item">
          <NavLink to={"/customer/api/get-all-coupons-category"}>
            Filter by category
          </NavLink>
        </li>
        <li className="Menu-item">
          <NavLink to={"/customer/api/get-all-coupons-max-price"}>
            Filter by max price
          </NavLink>
        </li>
        <li className="Menu-item">
          <NavLink to={"/customer/api/customer-details"}>
            Customer Details
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default CustomerMenu;
