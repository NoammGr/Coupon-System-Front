import { NavLink } from "react-router-dom";
import "./CompanyMenu.css";

function CompanyMenu(): JSX.Element {
  return (
    <div className="CompanyMenu">
      <ul className="Menu-list">
        <li className="Menu-item">
          <NavLink to={"/company/api/add-coupon"}>Add coupon</NavLink>
        </li>
        <li className="Menu-item">
          <NavLink to={"/company/api/update-coupon"}>Update coupon</NavLink>
        </li>
        <li className="Menu-item">
          <NavLink to={"/company/api/delete-coupon"}>Delete coupon</NavLink>
        </li>
        <li className="Menu-item">
          <NavLink to={"/company/api/get-all-company-coupons"}>
            Get all coupon
          </NavLink>
        </li>
        <li className="Menu-item">
          <NavLink to={"/company/api/get-company-details"}>
            Get company details
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default CompanyMenu;
