import React, { useState, useEffect } from "react";
import CompanyModel from "../../../Models/CompanyModel";
import { authStore } from "../../../Redux/AuthState";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import "./GetCompanyDetailes.css";
import { NavLink } from "react-router-dom";

function GetCompanyDetailes(): JSX.Element {
  const [company, setCompany] = useState<CompanyModel>();

  useEffect(() => {
    companyService
      .getCompanyDetails(authStore.getState().credentials.sub)
      .then((company) => {
        setCompany(company);
      })
      .catch((error: any) => {
        notificationService.error(error.response.data.message);
      });
  }, []);

  return (
    <div className="GetCompanyDetailes Box">
      <h2>Company details:</h2>
      {company && (
        <div>
          <h3>Id: {company.id}</h3>
          <h3>Name: {company.name}</h3>
          <h3>Email: {company.email}</h3>
          <h3>Password: {company.password}</h3>
          <h3>
            <NavLink to={"/company/api/manage-coupons"}>Coupons</NavLink>
          </h3>
          <h3>Client type: {company.clientType}</h3>
        </div>
      )}
    </div>
  );
}

export default GetCompanyDetailes;
