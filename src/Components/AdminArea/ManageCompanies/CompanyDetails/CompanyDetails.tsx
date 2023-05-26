import { useState, useEffect } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import notificationService from "../../../../Services/NotificationService";
import "./CompanyDetails.css";
import ComapnyModel from "../../../../Models/CompanyModel";
import adminService from "../../../../Services/AdminService";

function CompanyDetails(): JSX.Element {
  const navigate = useNavigate();

  const params = useParams();
  const companyId = +params.companyId;

  const [company, setComapny] = useState<ComapnyModel>();

  useEffect(() => {
    adminService.getOneCompany(companyId).then(
      (c) => {
        setComapny(c);
      },
      (error: any) => {
        notificationService.error(error.response.data.message);
      }
    );
  }, [companyId]);

  async function deleteComapny() {
    try {
      const ok = window.confirm("Are you sure ?");
      if (!ok) return;
      await adminService.deleteCompany(companyId);
      notificationService.success("Company deleted");
      navigate("/admin/api/manage-companies");
    } catch (error: any) {
      notificationService.error(error.response.data.message);
      console.dir(error);
    }
  }

  return (
    <div className="CompanyDetails">
      <h2>Company details :</h2>
      {company && (
        <span>
          <h3>Id: {company.id}</h3>
          <h3>Name: {company.name}</h3>
          <h3>Email: {company.email}</h3>
          <h3>Password: {company.password}</h3>
          <h3>Client type: {company.clientType}</h3>
          <br />
          <br />
          <br />
          <NavLink to={"/admin/api/manage-companies"}>
            Return to all companies
          </NavLink>
          <span> | </span>
          <NavLink to={"/admin/api/update-company/" + companyId}>
            Update
          </NavLink>
          <span> | </span>
          <NavLink to="" onClick={deleteComapny}>
            Delete
          </NavLink>
        </span>
      )}
    </div>
  );
}

export default CompanyDetails;
