import React, { useContext, useState } from 'react'
import payment from "./onlinePayment.module.css"
import { useFormik } from 'formik'
import { ThreeCircles } from 'react-loader-spinner'
import * as Yup from 'yup'
import axios from 'axios'
import { cartContext } from '../../context/cartContext'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from 'react-helmet'
export default function OnlinePayment() {

    const [isLoading, setIsLoading] = useState(false);
    const { CartId,
        setCartProduct,
        setTotalCartPrice,
        setNumberOfCartItems
    } = useContext(cartContext);


    async function confirmOnlinePayment(values) {
        try {
            setIsLoading(true)
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}`,
                {
                    shippingAddress: values
                }, {
                headers: { token: localStorage.getItem("tkn") },
                params: { url: `http://localhost:${window.location.port}` }
            })
            window.open(data.session.url, "_blank")

            if (data.status === "success") {
                setCartProduct([])
                setTotalCartPrice(0)
                setNumberOfCartItems(0)
                toast.success("Payment has been done successfully",)
            }
            else {
                toast.error("Error",)
            }
            console.log(data);
        } catch (error) {
            console.log("Error From payment", error);
        }
        setIsLoading(false)
    }
    let phoneRegex = /^(02)?01[0125][0-9]{8}$/;
    let validationSchema = Yup.object({
        phone: Yup.string().matches(phoneRegex, "The phone number does not match egyption number").required("Phone is required"),

    })
    const formikObj = useFormik({
        initialValues: {

            details: "",
            phone: "",
            city: ""

        },
        validationSchema,
        onSubmit: confirmOnlinePayment
    })


    return <section className='mt-5 pt-5'>
        <Helmet>
            <title>
                Online Payment
            </title>
        </Helmet>
        <section className={payment.background}>
            <div className="container p-5">
                <div className='w-50 mx-auto w50'>
                    <h2 className='main-color text-center mb-5'>
                        Submit Payment
                    </h2>


                    <form onSubmit={formikObj.handleSubmit}>

                        <label htmlFor="phone" className='py-3'>Phone :</label>
                        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.phone} type="tel" className="form-control" id='phone' placeholder='Phone ' name='phone' />
                        {formikObj.errors.phone && formikObj.touched.phone ? <div className='alert alert-danger mt-1'>{formikObj.errors.phone}</div> : ""}





                        <label htmlFor="city" className='py-3' >City :</label>
                        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.city} type="text" name="city" id="city" className='form-control ' placeholder='City' />
                        {(formikObj.errors.city && formikObj.touched.city) ? <div className='alert alert-danger mt-1'>{formikObj.errors.city}</div> : ""}


                        <label htmlFor="details" className='py-3'>
                            Details :
                        </label>
                        <textarea class="form-control" name="details" id="details" placeholder="Write what you want" onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.details}></textarea>

                        {(formikObj.errors.details && formikObj.touched.details) ? <div className='alert alert-danger mt-1'>{formikObj.errors.details}</div> : ""}






                        <button className='btn btn-success mt-5' type='submit' disabled={formikObj.isValid === false || formikObj.dirty === false}>
                            {isLoading ? <ThreeCircles
                                visible={true}
                                height="30"
                                width="60"
                                color="#fff"
                                ariaLabel="three-circles-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            /> : "submit Online Payment"}


                        </button>






                    </form>

                </div>
            </div>
        </section>
    </section>
}
