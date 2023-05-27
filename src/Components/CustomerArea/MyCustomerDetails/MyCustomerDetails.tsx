import { useEffect, useState } from "react";
import "./MyCustomerDetails.css";
import CustomerModel from "../../../Models/CustomerModel";
import customerService from "../../../Services/CustomerService";
import { authStore } from "../../../Redux/AuthState";
import notificationService from "../../../Services/NotificationService";
import { NavLink } from "react-router-dom";

function MyCustomerDetails(): JSX.Element {
  const [customer, setCustomer] = useState<CustomerModel>();

  useEffect(() => {
    customerService
      .getCustomerDetails(authStore.getState().credentials.sub)
      .then((customer) => {
        setCustomer(customer);
      })
      .catch((error) => {
        notificationService.error(error.response.data.message);
      });
  }, []);

  return (
    <div className="CustomerDetails Box">
      <h2>Customer details:</h2>
      {customer && (
        <div>
          <h3>Id: {customer.id}</h3>
          <h3>First name: {customer.firstName}</h3>
          <h3>Last name: {customer.lastName}</h3>
          <h3>Email: {customer.email}</h3>
          <h3>Password: {customer.password}</h3>
          <h3>
            <NavLink to={"/customer/api/my-coupons"}>Coupons</NavLink>
          </h3>
          <h3>Client type: {customer.clientType}</h3>
        </div>
      )}
    </div>
  );
}

export default MyCustomerDetails;
