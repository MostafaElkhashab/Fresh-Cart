import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Helmet } from 'react-helmet'
import * as Yup from 'yup'
import { ThreeCircles } from 'react-loader-spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import verify from './verify.module.css'
export default function VerifyPassword() {


  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [ErorrMsg, setErorrMsg] = useState(null);
  const navigate = useNavigate()
  async function resetCode(values) {
    try {
      setIsLoading(true)
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values)
      console.log(data);
      if (data.status === "Success") {
        setSuccessMsg("Successful Reset Code")
      }
      setTimeout(function () {
        navigate('/updateresetpassword');
      }, 2000)
      console.log(data);
    } catch (error) {
      console.log("Error From Reset Password", error);
      setErorrMsg(error.response.data.message)
    }
    setIsLoading(false)
  }
  let validationSchema = Yup.object({
    resetCode: Yup.string().min(6, "Must be 6 digits").max(6, "Must be 6 digits").required("Code is required"),
  })
  const formikObj = useFormik({
    initialValues: {
      resetCode: ""
    },
    validate: function () {
      setErorrMsg(null)
    },
    validationSchema,
    onSubmit: resetCode
  })

  return <section className='mt-5 pt-5'>
    {ErorrMsg ? <div className="alert alert-danger text-center  w-50 mx-auto mt-5 w50">{ErorrMsg}</div> : ""}
    {successMsg ? <div className="alert alert-success text-center  w-50 mx-auto mt-5 w50">{successMsg}</div> : ""}

    < section className={verify.background + " mt-5 min-vh-75 d-flex justify-content-center align-items-center "}>
      <Helmet>
        <title>Reset Code</title>
      </Helmet>
      <div className={' cart-cover p-5 rounded-5 w-50 w50'} >
        <h2 className="main-color text-center py-2">Verify Reset Code  </h2>
        <div className=''>
          <form onSubmit={formikObj.handleSubmit}>

            <div>
              <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.resetCode} type="text" name='resetCode' className={`form-control w-100 mb-3 ps-5 ${(formikObj.errors.resetCode && formikObj.touched.resetCode) ? "is-invalid" : ""} ${(!formikObj.errors.resetCode && formikObj.touched.resetCode) ? "is-valid" : ""}`} placeholder=' Enter Your Reset Code' />
              <i className="fa-solid fa-lock position-relative" style={{ bottom: "45px", left: "20px" }}></i>
            </div>
            {formikObj.errors.resetCode && formikObj.touched.resetCode ? <div className='alert alert-danger mt-1'>{formikObj.errors.resetCode}</div> : ""}
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
