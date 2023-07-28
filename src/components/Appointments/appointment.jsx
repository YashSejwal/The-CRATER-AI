import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  NavItem,
  NavLink,
  Nav,
} from "reactstrap";
import styles from "../../style";
import '../../index.css';
import Navbar from "../Navbar";
import Footer from "../Footer";
import bg from "../../assets/bgAp.png";
// import Cookies from "js-cookie";
// import Departments from "../Departments";
class Appointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Email: "",
      Contact: "",
      Age: "",
      Day: "",
      Speciality: "",
      Description: "",
      Id: "",
    };
    this.inputRef = React.createRef();
  }
  async handleSubmit(e) {
    console.log(this.state);
    try {
      const response = await axios.post(
        "http://localhost:3500/appointment/appointmentList",
        JSON.stringify(this.state),
        {
          headers: { "Content-Type": "application/json" ,'Access-Control-Allow-Origin': '*'},
          // withCredentials: true,
          
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      alert(response?.data);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      // errRef.current.focus();
    }
    // axios
    //   .post("http://localhost:3500/appointment/appointmentList", this.state, {
    //     headers: headers,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     alert(res.data);
    //   });
  }
  // componentDidMount() {
  // 	this.inputRef.current.focus();
  // }
  render() {
    return (
      <>
        <div id="appointmentpatient" className="bg-primary w-full overflow-hidden loginDiv appointmentdiv ">
          <Navbar/>
          <Nav tabs className={` ${styles.flexCenter}`} >
            <NavItem className="links" >
              <NavLink >
                <Link to="/doctorlist">Doctor List</Link>
              </NavLink>
            </NavItem>
            <NavItem className="links" >
              <NavLink active>
                <Link to="/getPatientProfile">Manage Appointment</Link>
              </NavLink>
            </NavItem>
            <NavItem className="links" >
              <NavLink  >
                <Link to="/getPatientProfile">Edit Profile</Link>
              </NavLink>
            </NavItem>
            <NavItem className="links">
              <NavLink >
                <Link to="/patientAppointments">
                  View Patient History
                </Link>
              </NavLink>
            </NavItem>
          </Nav>
          <section className="appointment ">
            <div className="container">
              <div className="section-title" style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <h1 style={{justifyContent:"center",fontSize:"56px", marginLeft:"5rem"}}>Make an Appointment</h1>
              </div>

              <form
                // action="forms/appointment.php"
                method="post"
                role="form"
                className="php-email-form"
              >
                <div className="row">
                  <div className="col-md-4 form-group">
                    <label>Name: </label>
                    <input
                      // innerRef={this.inputRef}
                      type="text"
                      name="name"
                      className="form-control"
                      id="name"
                      placeholder="Your Name"
                      data-rule="minlen:4"
                      data-msg="Please enter at least 4 chars"
                      onChange={(e) => {
                        this.setState({ Name: e.target.value });
                      }}
                    />
                    <div className="validate"></div>
                  </div>
                  <div className="col-md-4 form-group mt-3 mt-md-0">
                    <label>Email: </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="Your Email"
                      data-rule="email"
                      data-msg="Please enter a valid email"
                      onChange={(e) => {
                        this.setState({ Email: e.target.value });
                      }}
                    />
                    <div className="validate"></div>
                  </div>
                  <div className="col-md-4 form-group mt-3 mt-md-0">
                    <label>Phone Number: </label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      id="phone"
                      placeholder="Your Phone"
                      data-rule="minlen:4"
                      data-msg="Please enter at least 4 chars"
                      onChange={(e) => {
                        this.setState({ Contact: e.target.value });
                      }}
                    />
                    <div className="validate"></div>
                  </div>
                </div>
                <div className="row" style={{color:"black"}}>
                  <div className="col-md-4 form-group mt-3">
                    <label>Appointment Date: </label>
                    <input
                      type="datetime"
                      name="date"
                      className="form-control datepicker"
                      id="date"
                      placeholder="Appointment Date"
                      data-rule="minlen:4"
                      data-msg="Please enter at least 4 chars"
                      onChange={(e) => {
                        this.setState({ Day: e.target.value });
                      }}
                    />
                    <div className="validate"></div>
                  </div>
                  <div className="col-md-4 form-group mt-3" >
                    <label>Department: </label>
                    <select
                      name="department"
                      id="department"
                      className="form-select"
                    >
                      <option value="">Select Department</option>
                      <option value="Department 1">Neurosurgeon</option>
                      <option value="Department 2">Cardiology</option>
                      <option value="Department 3">Orthologist</option>
                    </select>
                    <div className="validate"></div>
                  </div>
                  <div className="col-md-4 form-group mt-3" style={{color:"black",display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                    <label>Doctor: </label>
                    <select name="doctor" id="doctor" className="form-select">
                      <option value="">Select Doctor</option>
                      <option value="Doctor 1">Dr. S.K. Sinha</option>
                      <option value="Doctor 2">Dr. Sahil Makhija</option>
                      <option value="Doctor 3">Dr. Riya</option>
                    </select>
                    <div className="validate"></div>
                  </div>
                </div>

                <div className="form-group mt-3" style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                  <label>Any message for the Doctor: </label>
                  <textarea
                    className="form-control"
                    name="message"
                    rows="5"
                    placeholder="Message (Optional)"
                  ></textarea>
                  <div className="validate"></div>
                </div>
                <div className="mb-3">
                  <div className="loading">Loading</div>
                  <div className="error-message"></div>
                  <div className="sent-message">
                    Your appointment request has been sent successfully. Thank
                    you!
                  </div>
                </div>
                <div className="text-center" style={{paddingBottom:"2rem"}}>
                  <button type="submit"  onClick={(e)=>{this.handleSubmit(e)}}>Make an Appointment</button>
                </div>
              </form>
            </div>
          </section>
          <Footer/>
        </div>
      </>
    );
  }
}

export default Appointment;
