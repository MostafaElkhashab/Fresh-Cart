import React, { useContext } from 'react'
import { cartContext } from '../../context/cartContext'
import { ColorRing } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Cart() {
    const { cartProduct, totalCartPrice, numberOfCartItems, deleteProductFromCart, updateCounter, removeCartData } = useContext(cartContext);

    async function clearCartData() {
        await removeCartData();

    }
    //Updata user Cart
    async function updataUserCartElements(id, counter) {
        const maxQuantity = 11;
        const minQuantity = 1;
        if (counter > maxQuantity) {
            toast.error("Maximum quantity exceeded");
            return;
        }
        else if (counter < minQuantity) {
            toast.error("Minimum quantity reached");
            return;
        }
        const res = await updateCounter(id, counter);
        console.log(res);
        if (res.status === "success") {
            toast.success("Item Updated Successfully from Cart");
        } else {
            toast.error("Item Updated Error");
        }
    }
    //delate Elemant
    async function deleteElementFromCart(id) {
        const res = await deleteProductFromCart(id);
        if (res.status === "success") {
            toast.success("Item Deleted Successfully from Cart");
        }
        else {
            toast.error("Item Deleted Error");
        }
        console.log(res);
    }
    //pending Data
    if (cartProduct === null) {
        return <>
            <ColorRing
                visible={true}
                height="120"
                width="100"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
        </>

    }
    if (cartProduct.length === 0) {
        return <div className='container mt-5 pt-5'>
            <div className='gif-margin'>
                <h2 className=' text-center'> No Data Found In Your Cart <Link style={{ color: "#0AAD0A" }} className={"shop-hover"} to={"/products"}>Go For Shopping...</Link></h2>
                <div className="d-flex justify-content-center align-content-center ">
                    <img src={require("../../images/empty-cart-illustration.gif")} className='text-center gif-img'  alt="" />
                </div>
            </div>
        </div>
    }

    return <section className={'mt-5 pt-5 background'}>
        <Helmet>
            <title>
                Cart
            </title>
        </Helmet>
        <div className="container py-5 cart-cover my-5">
            <h2 className='text-muted'>Shop Cart</h2>
            <div className='d-flex justify-content-between payment-btns '>
                <div>
                    <button className='btn btn-danger mb-1' onClick={clearCartData}>
                        <i className="fa-regular fa-trash-can me-1"></i>Clear Cart</button>
                </div>
                <div className='payment-btns'>
                    <Link to={"/CashPayment"}>
                        <button className='btn main-bg-color text-white mx-2 edit-btn'>
                            <i className="fa-solid fa-sack-dollar me-1 "></i>Confirm Cash Payment</button>
                    </Link>
                    <Link to={"/OnlinePayment"}>
                        <button className='btn main-bg-color text-white w50'>
                            <i className="fa-brands fa-cc-visa me-1 "></i>Confirm Online Payment </button>
                    </Link>
                </div>
            </div>

            <h2 className='text-muted'>{numberOfCartItems}</h2>
            <h4 className='main-color'>Total cart price : {totalCartPrice}EGP<i className="fa-solid fa-sack-dollar ms-1"></i></h4>
            {cartProduct.map(function (product, index) {
                console.log(product);
                return <div className="row mb-5 border-bottom border-3 p-2" key={index}>
                    <div className="col-md-1 ">
                        <img className='w-100' src={product.product.imageCover} alt="" />
                    </div>
                    <div className="col-md-8">
                        <h6 className='text-muted'>{product.product.title}</h6>
                        <p className='main-color'>Price : {product.price} EGP <i className="fa-solid fa-sack-dollar ms-1"></i></p>
                        <button onClick={() => deleteElementFromCart(product.product.id)} className='btn btn-outline-danger'>
                            <i className="fa-regular fa-trash-can me-1"></i>
                            Delete</button>
                    </div>
                    <div className="col-md-2">
                        <div className='d-flex align-items-center justify-content-center'>

                            <button onClick={() => updataUserCartElements(product.product.id, product.count + 1)} className='btn btn-outline-success'>+</button>
                            <span className='mx-2'>{product.count} </span>
                            <button onClick={() => updataUserCartElements(product.product.id, product.count - 1)} className='btn btn-outline-success'>-</button>
                        </div>
                    </div>
                </div>
            })}



        </div>
    </section>
}
