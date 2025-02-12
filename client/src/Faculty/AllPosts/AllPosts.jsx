import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL } from '../../data/apipath';
import './AllPosts.css'
import card from '../../assets/card.jpg'
import Navbar from '../HomeComponents/Navbar';

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [selectBranch, setSelectBranch] = useState("");
    const [faculty, setFaculty] = useState("");

    const postHandler = async (e) => {
        try {
            const response = await fetch(`${API_URL}/faculty/postFilter/${selectBranch}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.log("Posts not found");
            }

            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const getFaculty = async () => {
        const token = localStorage.getItem('loginToken');
        try {
            const response = await fetch(`${API_URL}/faculty/mydetails`, {
                method: "GET",
                headers: {
                    'token': `${token}`
                },
            });
            if (!response.ok) {
                console.log("No faculty found");
            }

            const data = await response.json();
            setFaculty(data);

        } catch (error) {
            console.error(error);
        }
    }

    const handleToken = (id, name) => {
        const token = localStorage.getItem('loginToken');
        if (!token) {
            alert("Login first to apply");
            return null;
        } else if (!faculty || !faculty.Resume) {
            alert("Complete the profile to apply");
            return null;
        } else {
            alert("SuccessToken");
            return { id, name };
        }
    };

    const ApplyPost = async (id, name) => {
        const token = localStorage.getItem('loginToken');
        const data = handleToken(id, name);
        if (!data) return;

        try {
            const response = await fetch(`${API_URL}/apply/application`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": `${token}`
                },
                body: JSON.stringify({ Organization: data.name, postId: data.id })
            });
            const result = await response.json();
            if (response.ok) {
                alert("Applied Successfully");
            } else {
                alert("Error");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        postHandler();
        getFaculty();
    }, [selectBranch]);

    return (
        <div className="AllPostss" >
            <Navbar />
            <div className="Filter_Branch">
                <h2></h2>
                <select name="branch" id="branch" className="filter" value={selectBranch} onChange={(e) => setSelectBranch(e.target.value)}>
                    <option value="Computer Science">Filter Branch</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Civil">Civil</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Information Technology">
                        Information Technology
                    </option>
                    <option value="Metallurgy">Metallurgy</option>
                    <option value="Automobile">Automobile</option>
                </select>
            </div>
            <div className="container posts" style={{ marginTop: "20px" }}>
                <div className="row">
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <div key={post._id} className="col-lg-4 col-sm-12 col-md-4 mb-4">
                                <div className="card" style={{ boxShadow: '0px 3px 15px rgba(40, 44, 49, 0.5)', borderRadius: '10px', height: "auto" }}>
                                    <div className="row no-gutters">
                                        <div className="col-auto">
                                            <img
                                                src={card || 'default-image-url.jpg'}
                                                alt="college"
                                                style={{ width: '100px', height: '100px', borderRadius: '10px', margin: '10px' }}
                                            />
                                        </div>
                                        <div className="col">
                                            <div className="card-body">
                                                <h2 className="card-title"><marquee behavior="" direction="">{post.Organization}</marquee></h2>
                                                <h5 className="card-subtitle mb-2 text-muted">Branch: {post.Branch}</h5>
                                                <p className="card-text"><b>Experience: {post.Experience}</b></p>
                                                <p className="card-text"><b>Designation: {post.Designation}</b></p>
                                                <p className="card-text"><b>No of Openings: {post.Nofopenings}</b></p>
                                                <p className="card-text"><b>Address-city: {post.address}</b></p>
                                                <p className="card-text"><b>College-Url: <a href={post.link}>Website</a></b></p>
                                                <p className="card-text"><b>Salary: {post.Salary}</b></p>
                                                <button onClick={() => ApplyPost(post._id, post.Organization)}>Apply</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No posts available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllPosts;
