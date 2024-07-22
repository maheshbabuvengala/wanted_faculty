import React, { useState, useEffect } from "react";
import org from "./Organize.module.css";
import { Link } from "react-router-dom";
import "./Temp.css";
import { API_URL } from "./data/apipath";
import Model from 'react-modal';
import { useNavigate } from "react-router-dom";

const Organize = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [Organization,setOrganization] = useState('');
  const [email,setemail] =useState('');
  const [password,setpassword] = useState('');
  const [Email,setEmail] = useState('');
  const [Password,setPassword] = useState('');
  const [visible,setvisible] = useState(false);
  const [Emails,setEmails] =useState('');
  const [OTP,setOTP] = useState('');
  const [newPassword,setnewPassword] =useState('')
  Model.setAppElement('#root')
  const navigate = useNavigate();




  useEffect(() => {
    setTimeout(() => {
      setIsSignIn(true);
    }, 200);
  }, []);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const mess = document.getElementById('error');
  const logmess = document.getElementById('logmess');
  const otp =document.getElementById('otp');
  const emailcheck = document.getElementById('emailcheck');

  const handleSubmit = async (e)=> {
    e.preventDefault()

    try {
      const response = await fetch(`${API_URL}/college/collegeSignup`,{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({Organization,email,password})
      })

      const data = await response.json();

      if(response.ok){
        console.log(data);
        alert('Registration Successful');
        setIsSignIn(true);
      }
      else{
        mess.textContent= "Email already Exists"
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogin = async (e)=> {
    e.preventDefault()

    try {
      const response = await fetch(`${API_URL}/college/collegeLogin`,{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({Email,Password})
      })

      const data = await response.json()


      if(response.ok){
        console.log(data)
        alert('Login successful')
        localStorage.setItem('collegeToken',data.token);
        navigate('/myposts')
      }
      logmess.textContent="Invalid Email or password"


    } catch (error) {
      
    }
  }
  const handleOtp =async (e)=> {
    e.preventDefault();
      try {
        const response = await fetch(`${API_URL}/college/collegeotp`,{
          method:'POST',
          headers:{
            'content-type':'application/json'
          },
          body:JSON.stringify({Emails})
        })

        const data = await response.json();

        if(response.ok){
          console.log(data);
          otp.textContent="* OTP send successfully"

        }
        else{
          emailcheck.textContent="Invalid Email id"
        }
      } catch (error) {
        console.error(error);
      }

  }  


  const handleResetPassword = async (e)=> {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/college/collegepassreset`,{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({Emails,OTP,newPassword})
      })

      const data = await response.json();

      if(response.ok){
        console.log(data);
        alert('Your password reset successfully');
        setvisible(false);
      }

      otp.textContent="An error occured please try again"
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div
      id="container"
      className={`${org.container} ${isSignIn ? org.signin : org.signup}`} style={{ zIndex: visible ? -1 : '6' }}
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
            <form action="" onSubmit={handleSubmit}>  
              <div className={org.inputgroup}>
                <i className={`${org.bx} ${org.bxsuser}`}></i>
                <p id="error"></p>
                <input type="text" placeholder="Organization Name"  value={Organization} onChange={(e)=> setOrganization(e.target.value)} required/>
              </div>
              <div className={org.inputgroup}>
                <i className={`${org.bx} ${org.bxmailsend}`}></i>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)} required/>
              </div>
              <div className={org.inputgroup}>
                <i className={`${org.bx} ${org.bxslockalt}`}></i>
                <input type="password" placeholder="Password" value={password} onChange={(e)=> setpassword(e.target.value)} required/>
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
            </form>  
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
            <form action="" onSubmit={handleLogin}> 
              <div className={org.inputgroup}>
                <p id="logmess"></p>
                <i className={`${org.bx} ${org.bxsuser}`}></i>
                <input type="text" placeholder="email" required value={Email} onChange={(e)=> setEmail(e.target.value)}/>
              </div>
              <div className={org.inputgroup}>
                <i className={`${org.bx} ${org.bxslockalt}`}></i>
                <input type="password" placeholder="Password" required value={Password} onChange={(e)=> setPassword(e.target.value)} />
              </div>
              <button type="submit">Sign in
              </button>
              <p>
                <Link onClick={(e)=> setvisible(true)}>Forget password</Link>
              </p>
              <p>
                <span>Don't have an account?</span>
                <b onClick={toggleForm} className={org.pointer}>
                  Sign up here
                </b>
              </p>
            </form> 
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
      <div className={org.modal} id="popup">
        <Model
          isOpen={visible}
          onRequestClose={() => setvisible(false)}
          className={org.content}
          // overlayClassName={org.overlay}
          style={{
            overlay: {
              zIndex: 2,
              background: 'rgba(0, 0, 0, 0.75)',
            }
          }}  
        >
            <h1 style={{color:"black"}} className={org.retext}>RESET PASSWORD</h1>
            <p id="emailcheck" style={{color:"black"}}></p>
            <form action="" onClick={handleOtp}>
              <div className={org.firotp}>
                <input type="text" placeholder="Email"  className={org.inp} value={Emails} onChange={(e)=> setEmails(e.target.value)}/>
                <button  className={org.otp} type="submit">Send OTP</button>
              </div>
            </form>
            <p id="otp" style={{color:"green"}}></p>
            <form action="" onSubmit={handleResetPassword}>
              <div className={org.secotp}>
              <input type="text" placeholder="OTP"  className={org.inp} value={OTP} onChange={(e)=> setOTP(e.target.value)}/>
              <input type="hidden" placeholder="OTP"  className={org.inp} value={Emails}/>
              <input type="text" placeholder="New Password"  className={org.inp} value={newPassword} onChange={(e)=> setnewPassword(e.target.value)}/>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                <button onClick={() => setvisible(false)} style={{ padding: '10px 20px', margin: '10px', }} className={org.close}>Close</button>
                <button style={{ padding: '10px 20px', margin: '10px' }} className={org.sub} type="submit">Submit</button>
              </div>
            </form>
        </Model>
      </div>  
    </div>
  );
};

export default Organize;
