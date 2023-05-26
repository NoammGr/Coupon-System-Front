import { NavLink } from "react-router-dom";
import ComapnyModel from "../../../../Models/CompanyModel";
import "./CompanyCard.css";

interface CompanyCardProps {
  company: ComapnyModel;
}

function CompanyCard(props: CompanyCardProps): JSX.Element {
  return (
    <div className="CompanyCard Box">
      <NavLink to={"/admin/api/company/details/" + props.company.id}>
        <h2>{props.company.name}</h2>
      </NavLink>
      Id: {props.company.id} <br />
      Email: {props.company.email}
    </div>
  );
}

export default CompanyCard;
