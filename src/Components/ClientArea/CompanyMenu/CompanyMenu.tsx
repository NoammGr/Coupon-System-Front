import { NavLink } from "react-router-dom";
import "./CompanyMenu.css";

function CompanyMenu(): JSX.Element {
  return (
    <div className="CompanyMenu">
      <ul className="Menu-list">
        <li className="Menu-item">
          <NavLink to={"/company/api/manage-coupons"}>Manage Coupons</NavLink>
        </li>
        <li className="Menu-item">
          <NavLink to={"/company/api/get-company-details/"}>Company details</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default CompanyMenu;
