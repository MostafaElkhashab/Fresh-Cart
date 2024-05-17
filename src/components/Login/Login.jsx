import React, { useContext, useState } from 'react'
import login from './login.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { ThreeCircles } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../../context/authentication'
import { Helmet } from 'react-helmet'
export default function Login() {
    const [errorMeg, setErorrMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { setToken, setUserData } = useContext(authContext);

    async function loginToAccount(values) {
        setIsLoading(true)
        try {
            let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
            console.log(data.token);
            if (data.message === "success") {
                console.log(data.user);
                
                localStorage.setItem("tkn", data.token)
                localStorage.setItem("profile",data.user.name)
                localStorage.setItem("account",data.user.email)
                setToken(data.token)
                setUserData(data.user.name)
                setSuccessMsg("Welcome Back");
                setTimeout(function () {
                    navigate('/products');
                }, 2000);
            }
        }
        catch (error) {
            console.log(error.response.data.message);
            setErorrMsg(error.response.data.message)
        }
        setIsLoading(false)
    }

    let validationSchema = Yup.object({
        email: Yup.string().email("E-mail should include '@' to be valid. ").required("E-mail is required"),


    })
    let formikObj = useFormik({
        initialValues: {
            email: "",
            password: ""

        }, validationSchema,
        validate: function () {
            setErorrMsg(null)
        },
        onSubmit: loginToAccount


    })

    return <section className='mt-5 pt-5'>
        <Helmet>
            <title>Login</title>
        </Helmet>
        <div className={' container py-5 ' + login.background} >
            {errorMeg ? <div className="alert alert-danger text-center  w-50 mx-auto w50">{errorMeg}</div> : ""}
            {successMsg ? <div className="alert alert-success text-center  w-50 mx-auto w50">{successMsg}</div> : ""}
            <div className="w-50 mx-auto w50">
                <h2 className={login.title + ' text-center'}>Login Now  </h2>
                <form onSubmit={formikObj.handleSubmit}>

                    
                    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email} type="email" className="form-control mt-5 ps-5" id='email'  placeholder=' Enter Your E-mail' name='email' />
                    <i className="fa-solid fa-envelope position-relative" style={{bottom:"30px",left:"20px"}}></i>
                    {formikObj.errors.email && formikObj.touched.email ? <div className='alert alert-danger mt-2'>{formikObj.errors.email}</div> : ""}


                    <div className='my-5'></div>
                    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.password} type="password" className="form-control ps-5"  placeholder=' Enter Your Password' name='password' />
                    <i className="fa-solid fa-lock position-relative"  style={{bottom:"60px",left:"20px"}}></i>
                    {formikObj.errors.password && formikObj.touched.password ? <div className='alert alert-danger mt-2'>{formikObj.errors.password}</div> : ""}

                    <button className='btn btn-success mt-5' type='submit' disabled={formikObj.isValid === false || formikObj.dirty === false}>
                        {isLoading ? <ThreeCircles
                            visible={true}
                            height="30"
                            width="60"
                            color="#fff"
                            ariaLabel="three-circles-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        /> : "Login"}


                    </button>
                    <div className='mt-5 d-flex justify-content-between align-items-center' >
                        <p > Are you New ?
                            <Link to={"/Registeration"} className='main-color'> Create An Account</Link>
                        </p>
                        <p>
                            <Link to={"/forgetpassword"} className="text-primary">Forget Password ?</Link>
                        </p>
                    </div>

                </form>
            </div>

        </div>

    </section>
}
