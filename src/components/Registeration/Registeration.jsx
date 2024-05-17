import React, { useState } from 'react'
import register from './register.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { ThreeCircles } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
export default function Registeration() {
    const [errorMeg, setErorrMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    async function sendingData(values) {
        setIsLoading(true)
        try {
            let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
            console.log(data);
            if (data.message === "success") {
                setSuccessMsg("Account has been created successfully");
                setTimeout(function () {
                    navigate('/login');
                }, 2000);
            }
        }
        catch (error) {
            console.log(error.response.data.message);
            setErorrMsg(error.response.data.message)
        }
        setIsLoading(false)
    }
    let phoneRegex = /^01[0125][0-9]{8}$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    let validationSchema = Yup.object({
        name: Yup.string().min(6, 'Name must be between 6 to 20 characters .').max(20, 'Name must be between 6 to 20 characters .').required("Name is required"),
        email: Yup.string().email("E-mail should include '@'  to be valid").required("E-mail is required"),
        phone: Yup.string().matches(phoneRegex, "The phone number does not match egyption number").required("Phone is required"),
        password: Yup.string().matches(passwordRegex, "Password at least containt Minimum 8 characters, at least one uppercase letter and one lowercase letter .").required("Password is required"),
        rePassword: Yup.string().oneOf([Yup.ref("password")], "Password and repassword does not match ^_^").required("Re-password is required")
    })
    let formikObj = useFormik({
        initialValues: {
            name: "",
            phone: "",
            email: "",
            password: "",
            rePassword: ""
        }, validationSchema,
        validate: function () {
            setErorrMsg(null)
        },
        onSubmit: sendingData


    })
    return <section className='mt-5 pt-5'>
        <Helmet>
            <title>
                Registeration
            </title>
        </Helmet>
        <div className={' container py-5 ' + register.background} >
            {errorMeg ? <div className="alert alert-danger text-center  w-50 mx-auto w50">{errorMeg}</div> : ""}
            {successMsg ? <div className="alert alert-success text-center  w-50 mx-auto w50">{successMsg}</div> : ""}
            <div className="w-50 mx-auto w50">
                <h2 className={register.title + ' text-center'}>Register Now  </h2>
                <form onSubmit={formikObj.handleSubmit}>



                    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.name} type="text" name="name" className={`form-control mt-5 ps-5 mb-3 ${(formikObj.errors.name && formikObj.touched.name) ? "is-invalid" : ""} ${(!formikObj.errors.name && formikObj.touched.name) ? "is-valid" : ""}`} placeholder=' Enter Your Name' />
                    <i className="fa-solid fa-user position-relative" style={{ bottom: "45px", left: "22px" }}></i>
                    {(formikObj.errors.name && formikObj.touched.name) ? <div className='alert alert-danger'>{formikObj.errors.name}</div> : ""}





                    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email} type="email" className={`form-control  mb-3 ps-5 ${(formikObj.errors.email && formikObj.touched.email) ? "is-invalid" : ""} ${(!formikObj.errors.email && formikObj.touched.email) ? "is-valid" : ""}`} placeholder=' Enter Your E-mail' name='email' />
                    <i className="fa-solid fa-envelope position-relative" style={{ bottom: "45px", left: "20px" }}></i>
                    {formikObj.errors.email && formikObj.touched.email ? <div className='alert alert-danger'>{formikObj.errors.email}</div> : ""}


                    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.password} type="password" className={`form-control  mb-3 ps-5 ${(formikObj.errors.password && formikObj.touched.password) ? "is-invalid" : ""} ${(!formikObj.errors.password && formikObj.touched.password) ? "is-valid" : ""}`} placeholder=' Enter Your Password' name='password' />
                    <i className="fa-solid fa-lock position-relative" style={{ bottom: "45px", left: "20px" }}></i>
                    {formikObj.errors.password && formikObj.touched.password ? <div className='alert alert-danger '>{formikObj.errors.password}</div> : ""}


                    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.rePassword} type="password" className={`form-control  mb-3 ps-5 ${(formikObj.errors.rePassword && formikObj.touched.rePassword) ? "is-invalid" : ""} ${(!formikObj.errors.rePassword && formikObj.touched.rePassword) ? "is-valid" : ""}`} placeholder='  Re-Password' name='rePassword' />
                    <i className="fa-solid fa-lock position-relative" style={{ bottom: "45px", left: "20px" }}></i>
                    {formikObj.errors.rePassword && formikObj.touched.rePassword ? <div className='alert alert-danger '>{formikObj.errors.rePassword}</div> : ""}


                    <div>
                        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.phone} type="tel" className={`form-control ps-5 ${(formikObj.errors.phone && formikObj.touched.phone) ? "is-invalid" : ""} ${(!formikObj.errors.phone && formikObj.touched.phone) ? "is-valid" : ""}`} placeholder=' Enter Your Phone Number ' name='phone' />
                        <i className="fa-solid fa-phone position-relative" style={{ bottom: "30px", left: "20px" }}></i>
                    </div>
                    {formikObj.errors.phone && formikObj.touched.phone ? <div className='alert alert-danger mt-2'>{formikObj.errors.phone}</div> : ""}
                    <button className='btn btn-success mt-5' type='submit' disabled={formikObj.isValid === false || formikObj.dirty === false}>
                        {isLoading ? <ThreeCircles
                            visible={true}
                            height="30"
                            width="60"
                            color="#fff"
                            ariaLabel="three-circles-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        /> : "Register"}


                    </button>





                </form>
            </div>
        </div>

    </section>
}
