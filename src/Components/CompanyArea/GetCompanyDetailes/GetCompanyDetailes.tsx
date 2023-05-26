import React, { useState, useEffect } from "react";
import CompanyModel from "../../../Models/CompanyModel";
import { authStore } from "../../../Redux/AuthState";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import "./GetCompanyDetailes.css";
import CouponModel from "../../../Models/CouponModel";

function GetCompanyDetailes(): JSX.Element {
  const [company, setCompany] = useState<CompanyModel>();
  const [coupons, setCoupons] = useState<CouponModel[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    companyService
      .getCompanyCoupons(authStore.getState().credentials.sub)
      .then((coupons) => {
        setCoupons(coupons);
      })
      .catch((error: any) => {
        notificationService.error(error.response.data.message);
      });
  }, []);

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

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="GetCompanyDetailes Box">
      <h2>Company details:</h2>
      {company && (
        <div>
          <h3>Id: {company.id}</h3>
          <h3>Name: {company.name}</h3>
          <h3>Email: {company.email}</h3>
          <h3>Password: {company.password}</h3>
          <h3 onClick={toggleMenu}>
            Coupons:{" "}
            <div className="coupons-menu">
              {isOpen && (
                <ul className="coupons-menu-list">
                  {coupons.map((coupon) => (
                    <li className="coupons-menu-item" key={coupon.id}>
                      {coupon.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </h3>
          <h3>Client type: {company.clientType}</h3>
        </div>
      )}
    </div>
  );
}

export default GetCompanyDetailes;
