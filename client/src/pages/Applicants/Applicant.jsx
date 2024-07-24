import React from "react";
import mod from "./Applicants.module.css";
import { Link } from "react-router-dom";
import { MdExitToApp } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";

const Applicant = () => {
  return (
    <div>
      <div className={mod.nav}>
        <div className={mod.slidebar}>
          <div className={mod.logo}>
            <Link to="/myposts" style={{ color: "white" }}>
              <FaArrowLeft className={mod.backarrow} />
            </Link>
            <h3>Welcome Organization name</h3>
            <h2></h2>
          </div>
          <div className={mod.header}>
            <div className={mod.userprofile}>
              <span className={mod.line}></span>
              <button className={mod.logout}>
                <Link to="/">
                  <span>Logout</span>
                  <span className={mod.logouticon}>
                    <MdExitToApp />
                  </span>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={mod.maincontent}>
        <br />
        <div className={mod.content}>
          <h1>Applicants</h1>
          <br />
          <br />
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Experience</th>
                <th>Designation</th>
                <th>Download Resume</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No Posts found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Applicant;
