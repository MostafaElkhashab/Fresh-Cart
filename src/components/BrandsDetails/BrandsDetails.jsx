import axios from 'axios';
import React from 'react'
import { Helmet } from 'react-helmet';
import { ThreeCircles } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import brandDetails from './brandsDetails.module.css'
export default function BrandsDetails() {
    const { id } = useParams()
    function getAllProducts() {
        return axios.get("https://route-ecommerce.onrender.com/api/v1/products", {
            params: { brand: id }
        })
    }
    const { data, isLoading } = useQuery("allProducts", getAllProducts);
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
    if (data?.data.data.length === 0) {
        return <div className='container mt-5 pt-5'>
            <div className='gif-margin'>
                <h2 className=' text-center main-color'> Hey Man There is No Products For This Brand 🤨</h2>
                <div className="d-flex justify-content-center align-content-center">
                    <img src={require("../../images/empty-cart-illustration.gif")} className='text-center gif-img'  alt="" />
                </div>
            </div>
        </div>
    }
    return <section className={'mt-5 pt-5 ' + brandDetails.background}>
        <Helmet>
            <title>
                Brand Products
            </title>
        </Helmet>
        <div className='container'>
            <span></span>
            <h2 className='text-center main-color mt-5'>Brand's Products</h2>
            <div className="row g-4 mt-3">

                {data?.data.data.map(
                    (brand) => {
                        console.log(brand);
                        return <div key={brand._id} className="product_card col-md-2 p-2 " >
                            <div className='product ' >
                                <Link to={`/productDetails/${brand._id}`}>
                                    <img src={brand.imageCover} alt="product" className='w-100 overflow-hidden rounded-1 ' />
                                    <h6 className='main-color p-1'>{brand.category.name}</h6>
                                    <h5 className=''>{brand.title.split(" ").slice(0, 2).join(" ")}</h5>
                                    <div className='d-flex justify-content-between align-align-items-center'>
                                        <p>{brand.price} EGP</p>
                                        <p>
                                            <i className="fa-solid fa-star" style={{ color: "#0AAD0A" }}></i>
                                            {brand.ratingsAverage}
                                        </p>
                                    </div>
                                </Link>




                            </div>
                        </div>
                    }
                )}

            </div>
        </div>
    </section>
}
