import { useState, useEffect } from "react";
import CompanyModel from "../../../Models/CompanyModel";
import notificationService from "../../../Services/NotificationService";
import "./ManageCompanies.css";
import adminService from "../../../Services/AdminService";
import { NavLink } from "react-router-dom";
import CompanyCard from "./CompanyCard/CompanyCard";

function ManageCompanies(): JSX.Element {
  const [companies, setCompanies] = useState<CompanyModel[]>([]);

  useEffect(() => {
    adminService
      .getAllCompanies()
      .then((arr) => {
        setCompanies(arr);
      })
      .catch((error) => {
        notificationService.error(error);
      });
  }, []);

  return (
    <div className="ManageCompanies">
      <NavLink className="AddCompanyButton Box" to={"/admin/api/add-company"}>
        Add company
      </NavLink>
      <br />

      {companies.length === 0 && <div>Loading ...</div>}

      {companies.map((c) => (
        <CompanyCard key={c.id} company={c} />
      ))}
    </div>
  );
}

export default ManageCompanies;
