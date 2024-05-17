import React, { useEffect, useState } from 'react'
import "./allOrders.css"
import { jwtDecode } from 'jwt-decode'
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
export default function AllOrders() {

    const [userOrders, setusersOrders] = useState(null)
    useEffect(() => {
        const res = jwtDecode(localStorage.getItem("tkn"));
        getUsersorders(res.id)
    }, [])
    if (userOrders === null) {
        return <div className='min-vh-100 d-flex justify-content-center align-items-start '>
            <ThreeCircles
                visible={true}
                height="700"
                width="100"
                color="#0AAD0A"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    }
    async function getUsersorders(id) {
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
            console.log(data);
            setusersOrders(data)
        } catch (error) {
            console.log("error ", error);
        }
    }
    return <section className='background mt-5 pt-5'>
        <Helmet>
            <title>
                All Orders
            </title>
        </Helmet>
        <div className="container py-5">
            <h2 className='title text-center mb-5'>All Orders :  </h2>
            <div className="row g-4">
                {userOrders.map((order, index) => {
                    return <div key={index} className="col-md-6">
                        <div className="order cart-cover rounded-5 p-5">
                            <div className="container">
                                <div className="row g-4">
                                    {order.cartItems?.map((item, idx) => {
                                        return <div className='col-sm-4 text-center' key={idx}>
                                            <div className="">
                                                <img src={item.product.imageCover} alt={item.product.imageCover} className='w-100' />
                                                <h6>{item.product.title.split(" ").slice(0, 2).join(" ")}
                                                </h6>
                                                <h6>
                                                    {item.count}
                                                </h6>
                                                <h6>
                                                    {item.price}
                                                </h6>

                                            </div>
                                        </div>
                                    })}
                                </div>
                                {console.log(order)}
                            </div>
                            <p className=''>Order Sent To You With Phone Number <span className='main-color'>{order?.shippingAddress.phone}</span>
                                at {order.shippingAddress.city}
                            </p>
                            <h5>
                                paymentMethodType : {order.paymentMethodType}

                            </h5>
                            <h6>
                                Total Cart Price : <span className='main-color'>
                                    {order.totalOrderPrice} EGP
                                </span>
                            </h6>
                        </div>
                    </div>
                })}

            </div>
        </div>
    </section>
}   
