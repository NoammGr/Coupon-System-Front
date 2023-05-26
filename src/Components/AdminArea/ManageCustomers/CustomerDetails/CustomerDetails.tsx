import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomerModel from "../../../../Models/CustomerModel";
import adminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./CustomerDetails.css";
import { NavLink } from "react-router-dom";

function CustomerDetails(): JSX.Element {
  const navigate = useNavigate();

  const params = useParams();
  const customerId = +params.customerId;

  const [customer, setCustomer] = useState<CustomerModel>();

  useEffect(() => {
    adminService.getOneCustomer(customerId).then(
      (c) => {
        setCustomer(c);
      },
      (error: any) => {
        notificationService.error(error.response.data.message);
      }
    );
  }, [customerId]);

  async function deleteCustomer() {
    try {
      const ok = window.confirm("Are you sure ?");
      if (!ok) return;
      await adminService.deleteCustomer(customerId);
      notificationService.success("Company deleted");
      navigate("/admin/api/manage-customers");
    } catch (error: any) {
      notificationService.error(error.response.data.message);
      console.dir(error);
    }
  }
  return (
    <div className="CustomerDetails">
      <h2>Customer details:</h2>
      {customer && (
        <span>
          <h4>Id: {customer.id}</h4>
          <h4>First name: {customer.firstName}</h4>
          <h4>Last name: {customer.lastName}</h4>
          <h4>Email: {customer.email}</h4>
          <h4>Password: {customer.password}</h4>
          <h4>Client type: {customer.clientType}</h4>
          <br />
          <br />
          <br />
          <NavLink to={"/admin/api/manage-customers"}>
            Return to all customers
          </NavLink>
          <span> | </span>
          <NavLink to={"/admin/api/update-customer/" + customerId}>
            Update
          </NavLink>
          <span> | </span>
          <NavLink to="" onClick={deleteCustomer}>
            Delete
          </NavLink>
        </span>
      )}
    </div>
  );
}

export default CustomerDetails;
