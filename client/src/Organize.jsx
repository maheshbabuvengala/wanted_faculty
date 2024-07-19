import React, { useState, useEffect } from "react";
import org from "./Organize.module.css";
import { Link } from "react-router-dom";
import "./Temp.css";

const Organize = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  useEffect(() => {
    // Initial animation after component mounts
    setTimeout(() => {
      setIsSignIn(true);
    }, 200);
  }, []);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  // const [active, setActive] = useState("home");

  return (
    <div
      id="container"
      className={`${org.container} ${isSignIn ? org.signin : org.signup}`}
    >
      <br />
      <div className={org.navbar}>
        <div className={org.navlinks}>
          <h3 className={org.active}>Organization</h3>
          <h3 className={org.inactive}>
            <Link to="/">Faculty</Link>
          </h3>
        </div>
      </div>
      <div className={org.row}>
        {/* SIGN UP */}
        <div
          className={`${org.col} ${org.alignitemscenter} ${org.flexcol} ${org.signup}`}
        >
          <div className={`${org.formwrapper} ${org.alignitemscenter}`}>
            <div className={`${org.form} ${org.signup}`}>
              <div className={org.inputgroup}>
                <i className={`${org.bx} ${org.bxsuser}`}></i>
                <input type="text" placeholder="Organization Name" />
              </div>
              <div className={org.inputgroup}>
                <i className={`${org.bx} ${org.bxmailsend}`}></i>
                <input type="email" placeholder="Email" />
              </div>
              <div className={org.inputgroup}>
                <i className={`${org.bx} ${org.bxslockalt}`}></i>
                <input type="password" placeholder="Password" />
              </div>
              {/* <div className={org.inputgroup}>
                <i className={`${org.bx} ${org.bxslockalt}`}></i>
                <input type="password" placeholder="Confirm password" />
              </div> */}
              <button>Sign up</button>
              <p>
                <span>Already have an account?</span>
                <b onClick={toggleForm} className={org.pointer}>
                  Sign in here
                </b>
              </p>
            </div>
          </div>
        </div>
        {/* END SIGN UP */}
        {/* SIGN IN */}
        <div
          className={`${org.col} ${org.alignitemscenter} ${org.flexcol} ${org.signin}`}
        >
          <div className={`${org.formwrapper} ${org.alignitemscenter}`}>
            <div className={`${org.form} ${org.signin}`}>
              <div className={org.inputgroup}>
                <i className={`${org.bx} ${org.bxsuser}`}></i>
                <input type="text" placeholder="email" />
              </div>
              <div className={org.inputgroup}>
                <i className={`${org.bx} ${org.bxslockalt}`}></i>
                <input type="password" placeholder="Password" />
              </div>
              <button>
                <Link to="/myposts">Sign in</Link>
              </button>
              <p>
                <b>Forgot password?</b>
              </p>
              <p>
                <span>Don't have an account?</span>
                <b onClick={toggleForm} className={org.pointer}>
                  Sign up here
                </b>
              </p>
            </div>
          </div>
        </div>
        {/* END SIGN IN */}
      </div>
      {/* END FORM SECTION */}
      {/* CONTENT SECTION */}
      <div className={`${org.row} ${org.contentrow}`}>
        {/* SIGN IN CONTENT */}
        <div className={`${org.col} ${org.alignitemscenter} ${org.flexcol}`}>
          <div className={`${org.text} ${org.signin}`}>
            <br />
            <br />
            <h2>Organization Login</h2>
          </div>
          <div className={`${org.img} ${org.signin}`}></div>
        </div>
        {/* END SIGN IN CONTENT */}
        {/* SIGN UP CONTENT */}
        <div className={`${org.col} ${org.alignitemscenter} ${org.flexcol}`}>
          <div className={`${org.img} ${org.signup}`}></div>
          <div className={`${org.text} ${org.signup}`}>
            <br />
            <br />
            <h2>Organization signup</h2>
          </div>
        </div>
        {/* END SIGN UP CONTENT */}
      </div>
      {/* END CONTENT SECTION */}
    </div>
  );
};

export default Organize;
