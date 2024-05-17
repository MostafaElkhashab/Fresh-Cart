import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Helmet } from 'react-helmet'
import * as Yup from 'yup'
import { ThreeCircles } from 'react-loader-spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import updateResetpassword from './updateResetPassword.module.css'
export default function UpdateResetPassword() {



    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState(null);
    const [ErorrMsg, setErorrMsg] = useState(null);
    const navigate = useNavigate()
    async function _updateResetPassword(values) {
        try {
            setIsLoading(true)
            const { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
            console.log(data);
            if (data.token) {
                setSuccessMsg("Password Updated Successfully.")
            }
            setTimeout(function () {
                navigate('/login');
            }, 2000)
            console.log(data);
        } catch (error) {
            console.log("Error From Reset Password", error);
            setErorrMsg(error.response.data.message)
        }
        setIsLoading(false)
    }
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    let validationSchema = Yup.object({
        email: Yup.string().email("E-mail should include '@' to be valid").required("E-mail is required"),
        newPassword: Yup.string().matches(passwordRegex, "Password at least containt Minimum 8 characters, at least one uppercase letter and one lowercase letter .").required("Password is required"),
    })
    const formikObj = useFormik({
        initialValues: {
            email: "",
            newPassword: "",

        },
        validate: function () {
            setErorrMsg(null)
        },
        validationSchema,
        onSubmit: _updateResetPassword
    })

    return <section className='mt-5 pt-5'>
        {ErorrMsg ? <div className="alert alert-danger text-center  w-50 mx-auto mt-5 w50">{ErorrMsg}</div> : ""}
        {successMsg ? <div className="alert alert-success text-center  w-50 mx-auto mt-5 w50">{successMsg}</div> : ""}

        < section className={updateResetpassword.background + " mt-5 min-vh-75 d-flex justify-content-center align-items-center "}>
            <Helmet>
                <title>Reset Password</title>
            </Helmet>
            <div className={' cart-cover p-5 rounded-5 w-50 w50'}  >
                <h2 className="main-color text-center py-3">Reset Password </h2>
                <div className=''>
                    <form onSubmit={formikObj.handleSubmit}>



                        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email} type="email" name='email' className={`form-control w-100 mb-3  ps-5 ${(formikObj.errors.email && formikObj.touched.email) ? "is-invalid" : ""} ${(!formikObj.errors.email && formikObj.touched.email) ? "is-valid" : ""}`} placeholder='Enter Your E-mail' />
                        <i className="fa-solid fa-envelope position-relative" style={{ bottom: "45px", left: "20px" }}></i>
                        {formikObj.errors.email && formikObj.touched.email ? <div className='alert alert-danger mt-1'>{formikObj.errors.email}</div> : ""}

                        <div>
                            <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.password} type="password" className={`form-control w-100 mb-3 ps-5  ${(formikObj.errors.newPassword && formikObj.touched.newPassword) ? "is-invalid" : ""} ${(!formikObj.errors.newPassword && formikObj.touched.newPassword) ? "is-valid" : ""}`} placeholder=' Enter Your New Password' name='newPassword' />

                            <i className="fa-solid fa-lock position-relative" style={{ bottom: "45px", left: "20px" }}></i>
                        </div>
                        {formikObj.errors.newPassword && formikObj.touched.newPassword ? <div className='alert alert-danger mt-1'>{formikObj.errors.newPassword}</div> : ""}


                        <button className='btn main-bg-color mt-5 text-white' type='submit' disabled={formikObj.isValid === false || formikObj.dirty === false}>
                            {isLoading ? <ThreeCircles
                                visible={true}
                                height="30"
                                width="60"
                                color="#fff"
                                ariaLabel="three-circles-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            /> : "Send"}


                        </button>
                    </form>
                </div>
            </div>
        </section></section>
}
