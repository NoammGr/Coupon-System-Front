import { NavLink } from "react-router-dom";
import "./AdminMenu.css";

function AdminMenu(): JSX.Element {
  return (
    <div className="AdminMenu">
      <ul className="Menu-list">
        <li className="Menu-item">
          <NavLink to={"/admin/api/manage-companies"}>Manage companies</NavLink>
        </li>
        <li className="Menu-item">
          <NavLink to={"/admin/api/manage-customers"}>Manage customers</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdminMenu;
