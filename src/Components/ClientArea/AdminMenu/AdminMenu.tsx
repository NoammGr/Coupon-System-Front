import { NavLink } from "react-router-dom";
import "./AdminMenu.css";

function AdminMenu(): JSX.Element {
  return (
    <div className="AdminMenu">
      <ul className="Menu-list">
        <li className="Menu-item">
          <NavLink to={"/admin/api/add-company"}>Add company</NavLink>
        </li>
        <li className="Menu-item">
          <NavLink to={"/admin/api/update-company"}>Update company</NavLink>
        </li>
        <li className="Menu-item">
          <NavLink to={"/admin/api/delete-company"}>Delete company</NavLink>
        </li>
        <li className="Menu-item">
          <NavLink to={"/admin/api/get-all-companies"}>
            Get all companies
          </NavLink>
        </li>
        <li className="Menu-item">
          <NavLink to={"/admin/api/get-one-company"}>Get company</NavLink>
        </li>
        <li className="Menu-item">
          <NavLink to={"/admin/api/add-customer"}>Add customer</NavLink>
        </li>
        <li className="Menu-item">
          <NavLink to={"/admin/api/update-customer"}>Update customer</NavLink>
        </li>
        <li className="Menu-item">
          <NavLink to={"/admin/api/delete-customer"}>Delete customer</NavLink>
        </li>
        <li className="Menu-item">
          <NavLink to={"/admin/api/get-all-customers"}>
            Get all customers
          </NavLink>
        </li>
        <li className="Menu-item">
          <NavLink to={"/admin/api/get-one-customer"}>Get customer</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdminMenu;
