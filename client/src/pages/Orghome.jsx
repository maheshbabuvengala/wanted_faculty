import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { MdExitToApp } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import mod from "./Orghome.module.css";
import { API_URL } from "../data/apipath";

// Set the app element for accessibility
Modal.setAppElement('#root');

const Orghome = () => {
  const [posts, setPosts] = useState([]);
  const [Details,setDetails] =useState([]);
  const [newData, setNewData] = useState({
    _id:'',
    Branch: '',
    Experience: '',
    Designation: '',
    Nofopenings: '',
    Salary: ''
  });

  const postHandler = async () => {
    try {
      const token = localStorage.getItem('collegeToken');
      const response = await fetch(`${API_URL}/college/myposts`, {
        method: 'GET',
        headers: {
          'token': `${token}`
        }
      });
      const newPosts = await response.json();
      setPosts(newPosts.Posts);
    } catch (error) {
      console.error(error);
    }
  };


  const getDetails = async (e)=> {
    try {
      const token = localStorage.getItem('collegeToken');
      const response = await fetch(`${API_URL}/college/mydetails`, {
        method: 'GET',
        headers: {
          'token': `${token}`
        }
      });
      const newPosts = await response.json();
      setDetails(newPosts);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    postHandler();
    getDetails();
    console.log("this is useeffect")
  }, []);



  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you want to delete the post");

    if(!confirm){
      return;
    }else{
    
    try {
      // alert("Are you really want to delete the post");
  
      const response = await fetch(`${API_URL}/college/deletepost/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json(); // Properly await the JSON response
  
      if (response.ok) {
        alert("Post deleted successfully");
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);
        window.location.reload();
      } else {
        alert("Post not deleted, try again later");
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert("An error occurred, please try again later");
    }
  }
  };


  return (
    <div className={mod.org}>
      <div className={mod.nav}>
        <div className={mod.slidebar}>
          <div className={mod.logo}>
            <h3>Welcome :{Details ?.Organization || "Organization"}</h3>
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
                  <td colSpan="6" style={{ textAlign: "center" }}>No Posts found</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table>
              <thead>
                <tr>
                  {/* <th>id</th> */}
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
                      <button className={mod.optiondelete} onClick={() => handleDelete(item._id)}>
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
