import React from "react";
import mod from "./Orghome.module.css";
import style from "./Addpost.module.css";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";

const Addpost = () => {
  return (
    <div>
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
      <div className={style.formbox}>
        <h1 style={{ marginTop: "10px", marginLeft: "10px", color: "white" }}>
          Add details
        </h1>
        <br />
        <br />
        <form action="" className={style.form}>
          <input
            className={style.input}
            placeholder="Organization"
            required
            type="text"
          />
          <span class={style.inputborder}></span>
          <input
            className={style.input}
            placeholder="Branch"
            required
            type="text"
          />
          <span class={style.inputborder}></span>
          <input
            className={style.input}
            placeholder="No of openings"
            required
            type="text"
          />
          <span class={style.inputborder}></span>
          <input
            className={style.input}
            placeholder="Salary"
            required
            type="text"
          />
          <span class={style.inputborder}></span>

          <input type="button" value="submit" className={style.button} />
        </form>
      </div>
    </div>
  );
};

export default Addpost;
