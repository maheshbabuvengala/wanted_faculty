import React from "react";
import mod from "./Orghome.module.css";
import { MdExitToApp } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import Addpost from "./Addpost";

const Orghome = () => {
  return (
    <div className={mod.org}>
      <div className={mod.nav}>
        <div className={mod.slidebar}>
          <div className={mod.logo}>
            <h3>Welcome Organization name</h3>
            <h2></h2>
          </div>
          <div className={mod.header}>
            <div className={mod.userprofile}>
              <span className={mod.userprofilenotification}>
                <FaBell />
              </span>
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
      <hr />
      <div className={mod.maincontent}>
        {/* <Banner /> */}
        <br />
        <div className={mod.content}>
          <h1>My Posts</h1>
          {/* <button className={mod.addasset}></button> */}
          <Link to="/addpost" className={mod.addasset}>
            Add New Post
          </Link>
          <br />
          <br />
          <table>
            <thead>
              <tr>
                {/* <th>Asset ID</th> */}
                <th>Department</th>
                <th>Experience</th>
                <th>Designation</th>
                <th>No. of Openings</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* <td>83-4546</td> */}
                <td>CSM</td>
                <td>2 years</td>
                <td>UG</td>
                <td>10</td>
                <td className={mod.options}>
                  <button className={mod.optionedit}>
                    <MdEdit className={mod.edit} />
                  </button>
                  <button className={mod.optiondelete}>
                    <MdDeleteForever className={mod.delete} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orghome;
