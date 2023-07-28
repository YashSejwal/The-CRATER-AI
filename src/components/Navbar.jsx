import { useState } from "react";
import { Link } from "react-router-dom";
import { close, menu } from "../assets";
import { navLinks } from "../constants";
import logo from "../assets/crater.png";
import './Navbar.css';
import loginLogo from "../assets/loginLogo.png";
const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [path, setPath] = useState("/");

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <Link to="/"><img src={logo} alt="healthcare" className="w-[284px] h-[65px]" /></Link>

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">

        <li
          style={{ color: "white" }}
        >
          <Link to="/" className="navelement">Home</Link>
        </li>
        <li
          style={{ color: "white", marginLeft: "15px" }}
        >
          <a href="#features" className="navelement">Features</a>
        </li>
        <li
          style={{ color: "white", marginLeft: "15px" }}
        >
         <a href="#about" className="navelement">About Us</a>
        </li>
        {/* payment */}
        <li
          style={{ color: "white", marginLeft: "15px" }}
        >
          <Link to="/" className="navelement">Contact Us</Link>
        </li>
        <li
          style={{ color: "white", marginLeft: "15px",marginRight:"15px" }}
        >
          <Link to="/" className="navelement">Login 
          <img src={loginLogo} style={{width:"34px"}} /></Link>
        </li>
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
            <li
              style={{ color: "white", marginLeft: "15px" }}
            >
              <Link to="/loginpatient">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
