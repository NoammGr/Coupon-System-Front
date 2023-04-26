import { useState } from "react";
import "./Menu.css";

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
            <a href="/home">Home</a>
          </li>
          <li className="Menu-item">
            <a href="/coupons">Coupons</a>
          </li>
          <li className="Menu-item">
            <a href="/about-us">About</a>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Menu;
