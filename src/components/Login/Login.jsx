import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import styles from "../../style";
import axios from "../../api/axios";
const LOGIN_URL = "/auth";
import Navbar from "../Navbar";
import Footer from "../Footer";
import CTA from "../CTA";
import { Link,useNavigate } from "react-router-dom";
import Appointment from '../Appointments/appointment';
import patientimg from "../../assets/patient.png";
import "./login.css"
import loginbgg from "../../assets/loginBgg.png";
const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const history = useNavigate()
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [admin, setAdmin] = useState("");
  useEffect(() => {
    userRef.current.focus();
    if(success==true){
      history("/afterlogin");
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          // withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      console.log(accessToken);
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          {history("/afterlogin")}
          <Appointment/>
        </section>
      ) : (
        <div className="bg-primary  overflow-hidden loginDiv ">
          <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <Navbar />
            </div>
          </div>
          <div className="formlogin"  style={{ marginTop:"-450px" }}>
            <img src={patientimg} alt="Image of a person" style={{ float: "left", width:"300px"}} />

            <form
              className="loginForm" id="signform"
              onSubmit={handleSubmit} style={{width: "600px",height:"550px",}}
              
            >
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <h1 className="loginElement" style={{transform:"translate(175px,40px)"}}>Sign In</h1>
              <label htmlFor="username" className="inputLabels" style={{transform:"translate(35px,40px)"}}>Username:</label>
              <input
                type="text"
                style={{width: "260px",transform: "translate(130px, 0px)"}}
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />

              <label htmlFor="password" className="inputLabels" style={{transform:"translate(35px,40px)"}}>Password:</label>
              <input
                type="password"
                id="password"
                style={{width: "260px",transform: "translate(130px, 0px)"}}
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                
              />
              <label className="inputLabels"  style={{transform:"translate(35px,10px)"}}>Choose (user type) :  </label>
              <div  style={{display:"flex",flexDirection:"row",transform:"translate(55px,10px)",marginInline:"60px" }}>
                <input
                  type="radio"
                  
                  id="Patient"
                  onChange={(e) => setPatient(e.target.value)}
                  value={patient}
                  required
                />
                &nbsp;
                <label htmlFor="type" className="inputLabels">Patient</label>&nbsp;&nbsp;&nbsp;
                <br></br>
                <input
                  type="radio"
                  id="doctor"
                  name="doctor"
                  onChange={(e) => setPatient(e.target.value)}
                  value={patient}
                />
                &nbsp;
                <label htmlFor="doctor" className="inputLabels">Doctor</label>&nbsp;&nbsp;&nbsp;
                <br />
                <input
                  type="radio"
                  id="admin"
                  name="admin"
                  onChange={(e) => setAdmin(e.target.value)}
                  value={admin}
                />
                &nbsp;
                <label htmlFor="admin" className="inputLabels">Admin</label>
              </div>
              <button className="mainBtn" style={{borderRadius:"20px",backgroundColor:"pink",padding:"10px 20px", color:"black",transform:"translate(195px,30px)",fontSize:"20px"}}><a href=" http://localhost:3000">Sign In</a></button>
              <div style={{transform:"translate(185px,40px)"}}>
              <p>
                Need an Account?
                <br />
                <span className="lines">
                  {/*put router link here*/}
                  <a href="/register" style={{textDecoration:"none",color:"pink"}}>
                    Sign Up
                  </a>
                </span>
              </p>
              </div>
            </form>
            <img src={loginbgg} style={{width:"100px", height:"100px",translate:"transform(100px,10px)" }}/>
          </div>
          <CTA />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Login;
