
import React, { useContext, useState } from 'react'
import { authContext } from '../../context/authentication'
import profile from "./profile.module.css"
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import { ThreeCircles } from 'react-loader-spinner';
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function Profile() {
  const { setToken, setUserData } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  const navFunc = useNavigate();
  async function sendingData(values) {
    setIsLoading(true)
    try {
      let { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword", values, {
        headers: { token: localStorage.getItem("tkn") }
      })
      console.log(data);
      if (data.message === "success") {
        toast.success("Password Updated Successfully");
        setTimeout(function () {
          localStorage.removeItem("tkn")
          localStorage.removeItem("profile")
          localStorage.removeItem("account")
          setToken(null)
          setUserData(null)
          toast.success("Please LogIn Again For Better Security");
          navFunc('/login');
        }, 5000);
      }
    }
    catch (error) {
      console.log(error.response.data.errors.msg);

      toast.error(error.response.data.errors.msg)
    }
    setIsLoading(false)
  }
  async function updateProfile(values) {
    setIsLoading(true)
    try {
      let { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/users/updateMe", values, {
        headers: { token: localStorage.getItem("tkn") }
      })
      console.log(data);
      if (data.message === "success") {
        toast.success("Profile Updated Successfully");
        setToken(data.token);
        localStorage.setItem("profile", data.user.name)
        localStorage.setItem("account", data.user.email)
        setTimeout(function () {
          window.location.reload(true)
        }, 1000)
      }
    }
    catch (error) {
      console.log(error.response.data.errors.msg);

      toast.error(error.response.data.errors.msg)
    }
    setIsLoading(false)
  }
  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  let phoneRegex = /^01[0125][0-9]{8}$/;
  let validationSchema = Yup.object({

    currentPassword: Yup.string().matches(passwordRegex, "Password at least containt Minimum 8 characters, at least one uppercase letter and one lowercase letter .").required("Password is required"),
    password: Yup.string().matches(passwordRegex, "Password at least containt Minimum 8 characters, at least one uppercase letter and one lowercase letter .").required("Password is required"),
    rePassword: Yup.string().oneOf([Yup.ref("password")], "Password and repassword does not match ^_^").required("Re-password is required")
  })
  let validationProfile = Yup.object({

    name: Yup.string().min(6, 'Name must be between 6 to 20 characters .').max(20, 'Name must be between 6 to 20 characters .').required("Name is required"),
    email: Yup.string().email("E-mail should include '@' to be valid").required("E-mail is required"),
    phone: Yup.string().matches(phoneRegex, "The phone number does not match egyption number").required("Phone is required"),
  })
  const passwordFormikObj = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: ""
    },
    validationSchema,
    validate: function () {

    },
    onSubmit: sendingData
  })
  const profileFormikObj = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: ""
    },
    validationSchema: validationProfile,
    validate: function () {

    },
    onSubmit: updateProfile
  })



  return (
    <section className={'mt-5 pt-5 ' + profile.background}>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className="container-fluid py-5 ">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6">
              <div className="card cart-cover text-white border-0">
                <div className="card-body">
                  <div className=" row align-items-center justify-content-between">
                    <div className='col-md-6 '>
                      <div className="profile-photo me-4 ">
                        <img src={require('../../images/me.jpg')} alt="Profile" className={"img-fluid " + profile.myImg} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <h2 className="card-title mb-0 text-dark text-uppercase fs-6" >Hello : {localStorage.getItem("profile")}</h2>
                        <p className="card-text text-info fw-bold pointer fs-6">MAIL <i className="fa-regular fa-envelope"></i> : {localStorage.getItem("account")}</p>
                        <div className='d-flex justify-content-between align-items-center profile-btns'>
                          <button type="button" className="btn btn-primary edit-btn" data-bs-toggle="modal" data-bs-target="#contactModal">Edit Profile</button>
                          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#contactModal2">Update Password</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="desc text-success  fs-5 pointer mt-4">
                    <p>Hi, I'm a Web Developer from Egypt. I have rich experience in web site design and building, and also I am good at web development. I love to talk with you about our unique.</p>
                    <p>My skills: HTML, CSS, SASS, Bootstrap, JavaScript, React, Redux,c++ ,c# ,oop,LINQ ,SQL Server,EFCore,DotNet Core,ASP.Net Core Web API & MVC ,Git, GitHub, Netlify, Illustrator, and more.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal elupdate profile */}
      <div className="container">
        <div className="modal fade" id="contactModal" tabIndex="-1" aria-labelledby="contactModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header border-0">
                <h5 className="modal-title" id="contactModalLabel">Edit Profile</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={profileFormikObj.handleSubmit}>
                  <div className="">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input onBlur={profileFormikObj.handleBlur} onChange={profileFormikObj.handleChange} value={profileFormikObj.values.name} type="text" name="name" className='form-control ps-5  mb-3' placeholder=' Enter Your Name' />
                    <i className="fa-solid fa-user position-relative" style={{ bottom: "45px", left: "20px", color: "black" }}></i>
                    {(profileFormikObj.errors.name && profileFormikObj.touched.name) ? <div className='alert alert-danger'>{profileFormikObj.errors.name}</div> : ""}

                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input onBlur={profileFormikObj.handleBlur} onChange={profileFormikObj.handleChange} value={profileFormikObj.values.email} type="email" className="form-control ps-5 mb-3" placeholder=' Enter Your E-mail' name='email' />
                    <i className="fa-solid fa-envelope position-relative" style={{ bottom: "45px", left: "20px", color: "black" }}></i>
                    {profileFormikObj.errors.email && profileFormikObj.touched.email ? <div className='alert alert-danger'>{profileFormikObj.errors.email}</div> : ""}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input onBlur={profileFormikObj.handleBlur} onChange={profileFormikObj.handleChange} value={profileFormikObj.values.phone} type="tel" className="form-control  ps-5" placeholder='Enter Your Phone Number ' name='phone' />
                    <i className="fa-solid fa-phone position-relative" style={{ bottom: "30px", left: "20px", color: "black" }}></i>
                    {profileFormikObj.errors.phone && profileFormikObj.touched.phone ? <div className='alert alert-danger mt-2'>{profileFormikObj.errors.phone}</div> : ""}
                  </div>
                  <div className="modal-footer border-0">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" disabled={profileFormikObj.isValid === false || profileFormikObj.dirty === false}>{isLoading ?
                      <ThreeCircles
                        visible={true}
                        height="30"
                        width="60"
                        color="#fff"
                        ariaLabel="three-circles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      /> : "Save Changes"}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal elupdate password */}
      <div className="container">
        <div className="modal fade" id="contactModal2" tabIndex="-1" aria-labelledby="contactModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header border-0">
                <h5 className="modal-title" id="contactModalLabel">Update Password</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={passwordFormikObj.handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="currentPassword" className="form-label">Current Password</label>
                    <input onBlur={passwordFormikObj.handleBlur} onChange={passwordFormikObj.handleChange} value={passwordFormikObj.values.currentPassword} type="text" className="form-control mb-3 ps-5" placeholder=' Enter Your Current Password' name='currentPassword' />
                    <i className="fa-solid fa-lock position-relative" style={{ bottom: "45px", left: "20px", color: "black" }}></i>
                    {passwordFormikObj.errors.currentPassword && passwordFormikObj.touched.currentPassword ? <div className='alert alert-danger '>{passwordFormikObj.errors.currentPassword}</div> : ""}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>

                    <input onBlur={passwordFormikObj.handleBlur} onChange={passwordFormikObj.handleChange} value={passwordFormikObj.values.password} type="password" className="form-control mb-3 ps-5" placeholder=' Enter Your Password' name='password' />
                    <i className="fa-solid fa-lock position-relative" style={{ bottom: "45px", left: "20px", color: "black" }}></i>
                    {passwordFormikObj.errors.password && passwordFormikObj.touched.password ? <div className='alert alert-danger '>{passwordFormikObj.errors.password}</div> : ""}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="rePassword" className="form-label">RePassword</label>
                    <input onBlur={passwordFormikObj.handleBlur} onChange={passwordFormikObj.handleChange} value={passwordFormikObj.values.rePassword} type="password" className="form-control mb-3 ps-5" placeholder=' Re- Password' name='rePassword' />
                    <i className="fa-solid fa-lock position-relative" style={{ bottom: "45px", left: "20px", color: "black" }}></i>
                    {passwordFormikObj.errors.rePassword && passwordFormikObj.touched.rePassword ? <div className='alert alert-danger '>{passwordFormikObj.errors.rePassword}</div> : ""}
                  </div>
                  <div className="modal-footer border-0">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" disabled={passwordFormikObj.isValid === false || passwordFormikObj.dirty === false}>{isLoading ?
                      <ThreeCircles
                        visible={true}
                        height="30"
                        width="60"
                        color="#fff"
                        ariaLabel="three-circles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      /> : "Save Changes"}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
