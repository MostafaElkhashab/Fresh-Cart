import React, { useState } from 'react'
import forget from './forgot.module.css'
import { useFormik } from 'formik'
import { Helmet } from 'react-helmet'
import * as Yup from 'yup'
import { ThreeCircles } from 'react-loader-spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function ForgetPassword() {

    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState(null);
    const [ErorrMsg, setErorrMsg] = useState(null);
    const navigate = useNavigate()
    async function forgetPassword(values) {
        try {
            setIsLoading(true)
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
            if (data.statusMsg === "success") {
                setSuccessMsg(data.message)
            }
            setTimeout(function () {
                navigate('/verifypassword');
            }, 3000)
            console.log(data);
        } catch (error) {
            console.log("Error From Reset Password", error);
            setErorrMsg(error.response.data.message)
        }
        setIsLoading(false)
    }
    let validationSchema = Yup.object({
        email: Yup.string().email("E-mail should include '@' to be valid").required("E-mail is required"),
    })
    const formikObj = useFormik({
        initialValues: {
            email: ""
        },
        validate: function () {
            setErorrMsg(null)
        },
        validationSchema,
        onSubmit: forgetPassword
    })

    return <section className='mt-5 pt-5'>
        {ErorrMsg ? <div className="alert alert-danger text-center  w-50 mx-auto mt-5 w50">{ErorrMsg}</div> : ""}
        {successMsg ? <div className="alert alert-success text-center  w-50 mx-auto mt-5 w50">{successMsg}</div> : ""}

        < section className={forget.background + " mt-5 min-vh-75 d-flex justify-content-center align-items-center "}>
            <Helmet>
                <title>Forgot Password</title>
            </Helmet>
            <div className={' cart-cover p-5 rounded-5 w-50 w50'}  >
                <h2 className="main-color text-center py-3 ">Forgot Password  </h2>
                <div className=''>
                    <form onSubmit={formikObj.handleSubmit}>

                        <div>
                            <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email} type="email" name='email' className={`form-control ps-5 w-100 mb-3 ${(formikObj.errors.email && formikObj.touched.email) ? "is-invalid" : ""} ${(!formikObj.errors.email && formikObj.touched.email) ? "is-valid" : ""}`} placeholder=' Enter Your E-mail' />
                            <i className="fa-solid fa-envelope position-relative" style={{ bottom: "45px", left: "20px" }}></i>
                        </div>
                        {formikObj.errors.email && formikObj.touched.email ? <div className='alert alert-danger mt-1'>{formikObj.errors.email}</div> : ""}
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
