import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";
import "./register.css";
import Navbar from "../../components/Navbar";
import styles from "../../style";
import { Link } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          // withCredentials: true,
        }
      );
      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response))
      setSuccess(true);
      //clear state and controlled inputs
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className="reg">
        {success ? (
          <section>
            <h1 className="titleLogin">Success!</h1>
            <p>
              <a href=" http://localhost:3000">Sign In</a>
            </p>
          </section>
        ) : (
          <section className="loginForm" style={{backgroundColor:""}}>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1 className="titleLogin">Register</h1> 
            <form onSubmit={handleSubmit} style={{marginLeft:"50px"}}>
              <label htmlFor="username" className="labels">
                Username                  
              <p  className="impinfo"><FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
              &nbsp; 
              Letters, numbers, underscores, hyphens allowed.</p>
              </label> 
            <div>
              <input
                className="input-field"
                type="text"
                id="username"
                placeholder="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              /> 
              
                </div>
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName ? "instructions" : "offscreen"
                }
              >
                
              </p>
             
              <label htmlFor="password" className="labels">
                Password  <br/>
              </label>
                  <p style={{color:"white"}} className="impinfo"><FontAwesomeIcon icon={faInfoCircle} className="info-icon"/>&nbsp; 
                    Must include an uppercase letter &
                    special character.</p>
              <div>
              <input
                className="input-field"
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                placeholder="password"
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              </div>
             

              <label htmlFor="confirm_pwd" className="labels">
                Confirm Password 
              </label>
             
              <div ><p style={{color:"white"}} className="impinfo"><FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
               &nbsp;  Must be same as the password.</p>
              <input
                className="input-field"
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              
              </div>
              <div >
              <div className="flex" style={{marginBottom:"90px"}}>
              <button className="buttonSignUp"
                disabled={!validName || !validPwd || !validMatch ? true : false}
              >
                <Link to="/loginpatient">Sign Up</Link>
              </button>
              <p className="formM">
              Already registered? &nbsp;&nbsp;&nbsp;
              <span className="line">
                {/*put router link here*/}
                <Link to="/loginpatient">Sign In</Link>
              </span>
            </p>
            </div>
            
            </div>
            </form>          </section>
        )}
      </div>
    </div>
  );
};

export default Register;
