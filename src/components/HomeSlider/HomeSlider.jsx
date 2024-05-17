import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function HomeSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed:5000,
        autoplay:true,
        slickPlay:true
    };
    return <>
        <Slider {...settings}>
            <div>
                <img className='w-100 home-slider' alt='slider' src={require('../../images/Apple-Products-expected-to-launch-in-2023.webp')}/>
            </div>
            <div>
                <img className='w-100 home-slider' alt='slider' src={require("../../images/slider-image-3.jpeg")}/>
            </div>
            <div>
                <img className='w-100 home-slider' alt='slider' src={require('../../images/slider-image-1.jpeg')}/>
            </div>
            <div>
                <img className='w-100 home-slider'alt='slider' src={require('../../images/slider-image-2.jpeg')}/>
            </div>
            <div>
                <img className='w-100 home-slider' alt='slider' src={require('../../images/slider-2.jpeg')}/>
            </div>
            <div>
                <img className='w-100 home-slider' alt='slider' src={require('../../images/mmm.jpg')}/>
            </div>
            <div>
                <img className='w-100 home-slider' alt='slider' src={require('../../images/M1_car-polish.jpg')}/>
            </div>
        </Slider>

    </>
}
