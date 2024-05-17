import axios from 'axios';
import React, { useContext, useState } from 'react'
import { ThreeCircles } from 'react-loader-spinner';
import { useQuery } from 'react-query'
import {  useParams } from 'react-router-dom';
import './productdetails.css'
import { cartContext } from '../../context/cartContext';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from 'react-helmet';
import { authContext } from '../../context/authentication';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { wishListContext } from '../../context/wishListContext';

export default function ProductDetails() {

    const [sendingLoader, setSendingLoader] = useState(false)
    const [sendingWishLoader, setsendingWishLoader] = useState(false)
    const { addProductToCart } = useContext(cartContext);
    const { token } = useContext(authContext)
    const { addProductToWishList } = useContext(wishListContext)


    function errorMsg() {
        toast.error("YOU MUST LOGIN FIRST",

        )
    }
    async function addProduct(id) {

        setSendingLoader(true)
        const res = await addProductToCart(id);
        console.log(res);
        if (res.status === "success") {
            toast.success(res.message)
        }
        else {
            toast.error("Cant Add the Product to cart")
        }
        setSendingLoader(false)
    }
    const { id } = useParams()
    async function addToWishList(id) {

        setsendingWishLoader(true)
        const res = await addProductToWishList(id);
        console.log(res);
        if (res.status === "success") {
            toast.success(" 💖 " + res.message)
        }
        else {
            toast.error("Cant Add the Product to cart")
        }
        setsendingWishLoader(false)
    }

    function getProductDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    const { data, isLoading } = useQuery("productDetails", getProductDetails);
    console.log(data?.data.data);
    if (isLoading) {

        return <>
            <div className='min-vh-100 d-flex justify-content-center align-items-start '>
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
        </>
    }
    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 1000,
        autoplay: true,
        slickPlay: true,
        arrow: true
    };
    return <section className='mt-5 pt-5'>
        <div className="container py-5 background_cover text-center">
            <div className="row align-items-center justify-content-between">
                <div className='col-md-4 '>

                    <Slider {...settings} className='' >
                        {data.data.data.images.map(function (image, idx) {


                            return <div key={idx} style={{}}>
                                <img src={image} alt='product' className='w-100 ' style={{ height: "400px" }} />
                            </div>

                        })}
                    </Slider>

                </div>
                <div className="col-md-3 ">
                    <img className='w-100 ' src={data.data.data.imageCover} alt={data.data.data.title} />
                </div>
                <div className="col-md-4">
                    <Helmet>
                        <title>
                            {data.data.data.title.split(" ").slice(0, 2).join(" ")}
                        </title>
                    </Helmet>
                    <div className="text-center">
                        <h2 className='main-color'>{data.data.data.title}</h2>
                        <h5 className='text-muted'>{data.data.data.description}</h5>
                        <p>Rating :
                            <i className="fa-solid fa-star" style={{ color: "#FFD43B" }}> </i>
                            {data.data.data.ratingsAverage}
                        </p>
                        <p> Quantity : {data.data.data.quantity}</p>
                        <p> Category : {data.data.data.category.name}</p>

                        {token ? <button onClick={() => { addToWishList(data.data.data.id) }} className='btn btn-outline-danger mb-5 '>
                            {sendingWishLoader ? <ThreeCircles
                                visible={true}
                                height="30"
                                width="100"
                                color="#ff3d3d"
                                ariaLabel="three-circles-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            /> : "+ ADD To With List ❤"}

                        </button > :
                            <button className='btn btn-outline-danger mb-5' onClick={errorMsg}>
                                + ADD To Wish List
                                <i className="fa-regular fa-heart ms-1 fw-bold" style={{ color: "#ff3d3d" }}></i>
                            </button>
                        }
                        <div className='d-flex justify-content-between align-items-center'>

                            <h6 className='  fs-3 main-color'>Price :  {data.data.data.price} EGP</h6>
                            {token ? <button onClick={() => { addProduct(data.data.data.id) }} className='btn text-white main-bg-color '>
                                {sendingLoader ? <ThreeCircles
                                    visible={true}
                                    height="30"
                                    width="100"
                                    color="white"
                                    ariaLabel="three-circles-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                /> : "🛒 ADD To Cart"}</button > :
                                <button className='btn text-white main-bg-color ms-5' onClick={errorMsg}>
                                    🛒ADD To Cart

                                </button>
                            }

                        </div>


                    </div>
                </div>
            </div>
        </div>
    </section>
}
