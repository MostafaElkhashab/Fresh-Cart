import React, { useContext } from 'react'
import './products.css'
import axios from 'axios'
import { ThreeCircles } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import HomeSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../categorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { cartContext } from '../../context/cartContext';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from 'react-helmet';
import { authContext } from './../../context/authentication';
import { wishListContext } from '../../context/wishListContext';

export default function Products() {

  const { addProductToCart } = useContext(cartContext);
  const { addProductToWishList} = useContext(wishListContext)
  const { token } = useContext(authContext)

  async function addProduct(id) {

    const res = await addProductToCart(id);
    console.log(res);
    if (res.status === "success") {
      toast.success(res.message,)
    }
    else {
      toast.error("Something wrong happend",)
    }

  }
  async function addToWishList(id) {

    const res = await addProductToWishList(id);
    console.log(res);
    if (res.status === "success") {
      toast.success(" 💖 " + res.message)
    }
    else {
      toast.error("Cant Add the Product to cart")
    }
  }

  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }
  const { data, isLoading } = useQuery("allProducts", getAllProducts);
  console.log(data?.data.data);


  if (isLoading === true) {
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
  function errorMsg() {
    toast.error("YOU MUST LOGIN FIRST",)
  }
  return <>
    <Helmet>
      <title>
        All Products

      </title>
    </Helmet>
    <section className=" background_cover mt-5 pt-5">
      <div className="container pt-5 ">
        <div className="row gx-0">
          <div className="col-sm-12">
            <HomeSlider />

          </div>

        </div>
        <CategorySlider />
        <div className="row g-4 mt-3">

          {data?.data.data.map(
            (product) => {
              return <div key={product._id} className="product_card col-md-2 p-2 " >
                <div className='product position-relative' >
                  {token ? <>
                    <span className='wish-list text-danger fs-4 shadow position-absolute' onClick={() => { addToWishList(product._id) }}>
                      <i className="fa-regular fa-heart text-danger"></i>
                    </span>
                  </>

                    :
                    <>

                      <span className='wish-list text-danger fs-4 shadow position-absolute' onClick={errorMsg}>
                        <i className="fa-regular fa-heart text-danger"></i>
                      </span>

                    </>

                  }


                  <Link to={`/productDetails/${product.id}`}>
                    <img src={product.imageCover} alt="product" className='w-100 overflow-hidden rounded-1 ' />
                    <h6 className='main-color p-1'>{product.category.name}</h6>
                    <h5 className=''>{product.title.split(" ").slice(0, 2).join(" ")}</h5>
                    <div className='d-flex justify-content-between align-align-items-center'>
                      <p>{product.price} EGP </p>
                      <p>
                        <i className="fa-solid fa-star" style={{ color: "#0AAD0A" }}></i>
                        {product.ratingsAverage}
                      </p>
                    </div>

                  </Link>
                  {
                    token ? <button onClick={() => { addProduct(product.id) }} className='btn text-white main-bg-color  w-100 cart-button'>
                      🛒 ADD To Cart
                    </button> :

                      <button className='btn text-white main-bg-color  w-100 cart-button' onClick={errorMsg}>
                        🛒 ADD To Cart

                      </button>

                  }

                </div>
              </div>
            }
          )}

        </div>
      </div>


    </section>


  </>

}
