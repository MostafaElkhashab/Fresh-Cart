import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { useQuery } from 'react-query';
import { Vortex } from 'react-loader-spinner';

export default function CategorySlider() {

    function getAllCategories() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }
    const { data, isLoading } = useQuery("allCategories", getAllCategories);

    if (isLoading) {
        return <div className=' d-flex justify-content-center align-items-center '>
            <Vortex
                visible={true}
                height="80"
                width="80"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
            />
        </div>
    }
    console.log(data?.data.data);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        arrows: false
    };
    return <>
        <div className=''>
            <h2 className='main-color mt-5'>Categories</h2>
            <Slider  {...settings}>
                {data?.data.data.map((category, index) => {
                    return <div key={index} className='mt-4'>
                        <img className='w-100 cat-slider' alt='slider' src={category.image} />
                        <h6 className='my-2'>{category.name}</h6>
                    </div>
                })}
            </Slider>
            
        </div>

    </>
}
