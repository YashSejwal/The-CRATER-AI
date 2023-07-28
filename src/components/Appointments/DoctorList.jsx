import React from "react";
import img from "../../assets/csoon.png";
import Navbar from "../Navbar";
import './doctor.css';
import '../../index.css';
import {
	NavItem,
	NavLink,
	Nav,
  } from "reactstrap";
  import styles from "../../style";
  import { Link } from "react-router-dom";
import { people01, people02, people03 } from "../../assets";
const DoctorList = () => {
  return (
    <>
      <div
        id="appointmentpatient"
        className="bg-primary w-full overflow-hidden loginDiv appointmentdiv "
      >
        <Navbar />
        <Nav tabs className={` ${styles.flexCenter}`}>
          <NavItem className="links">
            <NavLink>
              <Link to="/doctorlist">Doctor List</Link>
            </NavLink>
          </NavItem>
          <NavItem className="links">
            <NavLink active>
              <Link to="/getPatientProfile">Manage Appointment</Link>
            </NavLink>
          </NavItem>
          <NavItem className="links">
            <NavLink>
              <Link to="/getPatientProfile">Edit Profile</Link>
            </NavLink>
          </NavItem>
          <NavItem className="links">
            <NavLink>
              <Link to="/patientAppointments">View Patient History</Link>
            </NavLink>
          </NavItem>
        </Nav>
      </div>
      <div className="doctors">
        <div className="card" style={{width: "18rem"}}>
          <center><img src={people02} className="card-img-top" alt="..." /></center>
          <div className="card-body">
            <h5 className="card-title">Dr. Sahil Khan</h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"> MD,MBBS</li>
            <li className="list-group-item">Experience: 10 years</li>
            <li className="list-group-item">MEDANTA HOSPITAL</li>
          </ul>
          <div className="card-body">
		  	<Link to="/appointment" className="mainbtn">Book An Appointment</Link>
          </div>
        </div>
		<div className="card" style={{width: "18rem"}}>
		<center><img src={people02} className="card-img-top" alt="..." /></center>
		<center><div className="card-body">
			<h5 className="card-title">Dr. Vishal Maurya</h5>
		</div>		</center>
		<center><ul className="list-group list-group-flush">
			<li className="list-group-item">MD , MBBS</li>
			<li className="list-group-item">Experience: 20 years</li>
			<li className="list-group-item">KAILASH HOSPITAL</li>
		</ul>		</center>
		<center><div className="card-body">
			<Link to="/appointment" className="mainbtn">Book An Appointment</Link>
		</div>		</center>
		</div>
		<div className="card" style={{width: "18rem"}}>
		<center><img src={people02} className="card-img-top" alt="..." /></center>
		<center><div className="card-body">
			<h5 className="card-title">Dr. Deep Sharma</h5>
		</div></center>
		<center><ul className="list-group list-group-flush">
			<li className="list-group-item">MD , MBBS </li>
			<li className="list-group-item">Experience: 10 years</li>
			<li className="list-group-item">RML HOSPITAL</li>
		</ul>		</center>
		<center><div className="card-body">
			<Link to="/appointment" className="mainbtn">Book An Appointment</Link>
		</div>		</center>
		</div>
      </div>
    </>
  );
};

export default DoctorList;