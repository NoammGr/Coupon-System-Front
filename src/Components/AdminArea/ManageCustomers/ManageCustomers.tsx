import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import CustomerCard from "./CustomerCard/CustomerCard";
import "./ManageCustomers.css";

function ManageCustomers(): JSX.Element {
  const [customers, setCustomers] = useState<CustomerModel[]>([]);

  useEffect(() => {
    adminService
      .getAllCustomers()
      .then((arr) => {
        setCustomers(arr);
      })
      .catch((error: any) => {
        notificationService.error(error.response.data.message);
      });
  }, []);

  return (
    <div className="ManageCustomers">
      <NavLink className="AddCustomerButton" to={"/admin/api/add-customer"}>
        Add customer
      </NavLink>
      <br />
      {customers.length === 0 && <div>Loading ...</div>}

      {customers.map((c) => (
        <CustomerCard key={c.id} customer={c} />
      ))}
    </div>
  );
}

export default ManageCustomers;
