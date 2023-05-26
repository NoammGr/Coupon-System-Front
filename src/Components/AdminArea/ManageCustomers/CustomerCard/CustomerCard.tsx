import { NavLink } from "react-router-dom";
import CustomerModel from "../../../../Models/CustomerModel";
import "./CustomerCard.css";

interface CustomerCardProps {
  customer: CustomerModel;
}

function CustomerCard(props: CustomerCardProps): JSX.Element {
  return (
    <div className="CustomerCard Box">
      <NavLink to={"/admin/api/customer/details/" + props.customer.id}>
        <h2>
          {props.customer.firstName} {props.customer.lastName}
        </h2>
      </NavLink>
      Id: {props.customer.id} <br />
      Email: {props.customer.email} <br />
    </div>
  );
}

export default CustomerCard;
