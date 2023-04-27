import { useState } from "react";
import "./Menu.css";
import { NavLink } from "react-router-dom";

function Menu(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="Menu">
      <button className="Menu-button" onClick={toggleMenu}>
        <p className="Menu-name">Menu</p>
      </button>
      {isOpen && (
        <ul className="Menu-list">
          <li className="Menu-item">
            <NavLink to={"/home"}>Home</NavLink>
          </li>
          <li className="Menu-item">
            <NavLink to={"/coupons"}>Coupons</NavLink>
          </li>
          <li className="Menu-item">
            <NavLink to={"/about-us"}>About</NavLink>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Menu;
