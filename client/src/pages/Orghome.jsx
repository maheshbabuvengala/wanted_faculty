import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { MdExitToApp } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import mod from "./Orghome.module.css";
import { API_URL } from "../data/apipath";

// Set the app element for accessibility
Modal.setAppElement("#root");

const Orghome = () => {
  const [posts, setPosts] = useState([]);
  const [deletePost, setdeletePost] = useState("");
  const [newData, setNewData] = useState({
    _id: "",
    Branch: "",
    Experience: "",
    Designation: "",
    Nofopenings: "",
    Salary: "",
  });

  const postHandler = async () => {
    try {
      const token = localStorage.getItem("collegeToken");
      const response = await fetch(`${API_URL}/college/myposts`, {
        method: "GET",
        headers: {
          token: `${token}`,
        },
      });
      const newPosts = await response.json();
      setPosts(newPosts.Posts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    postHandler();
    console.log(deletePost);
  }, []);

  const handleDelete = async (id) => {
    // Add your delete logic here
    const updatedPosts = posts.filter((post) => post.id == id);
    setdeletePost(updatedPosts);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData({
      ...newData,
      [name]: value,
    });
  };

  return (
    <div className={mod.org}>
      <div className={mod.nav}>
        <div className={mod.slidebar}>
          <div className={mod.logo}>
            <h3>Welcome :{posts[0]?.Organization || "Organization"}</h3>
            <h2></h2>
          </div>
          <div className={mod.header}>
            <div className={mod.userprofile}>
              <Link to="/applicant" className={mod.userprofilenotification}>
                <h3>My Applicants</h3>
                <FaBell />
              </Link>
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
        <br />
        <div className={mod.content}>
          <h1>My Posts</h1>
          <Link to="/addpost" className={mod.addasset}>
            Add New Post
          </Link>
          <br />
          <br />
          {posts.length === 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Experience</th>
                  <th>Designation</th>
                  <th>No. of Openings</th>
                  <th>Salary</th>
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
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Experience</th>
                  <th>Designation</th>
                  <th>No. of Openings</th>
                  <th className="Salary">Salary</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((item) => (
                  <tr key={item.id}>
                    {/* <td>{item._id}</td> */}
                    <td>{item.Branch}</td>
                    <td>{item.Experience}</td>
                    <td>{item.Designation}</td>
                    <td>{item.Nofopenings}</td>
                    <td>{item.Salary}</td>
                    <td className={mod.options}>
                      <button
                        className={mod.optiondelete}
                        onClick={() => handleDelete(item.id)}
                      >
                        <MdDeleteForever className={mod.delete} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orghome;
