import React, { useContext, useEffect, useState } from 'react'
import { wishListContext } from '../../context/wishListContext'
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { cartContext } from '../../context/cartContext';
import wish from "./wishList.module.css"



export default function WishList() {

    const {
        deleteProductFromWishList,
        setLikedProducts,
        setWishListCount,
        getUserWishList,
        wishListCount

    } = useContext(wishListContext);
    const { addProductToCart } = useContext(cartContext);
    const [wishList, setWishList] = useState(null);
    // const [loading, setLoading] = useState(true);
    async function getWishList() {
        let { data } = await getUserWishList();
        setWishList(data);
        // setLoading(false);
        setWishListCount(data?.data?.length);
    }
    async function addProduct(id) {

        const res = await addProductToCart(id);
        console.log(res);
        if (res.status === "success") {
            toast.success(res.message)
        }
        else {
            toast.error("Cant Add the Product to cart")
        }

    }
    async function deleteElementFromWishList(id) {
        const { data } = await deleteProductFromWishList(id);
        if (data.status === "success") {
            toast.success(" 💔 Item Deleted Successfully from WishList");
            updateWishListState(data.data)
            getWishList(data);
        }
        else {
            toast.error("Item Deleted Error");
        }

    }
    function updateWishListState(wishlistData) {
        setWishListCount(wishlistData.length);
        setLikedProducts(wishlistData);
        localStorage.setItem("wishlist", JSON.stringify(wishlistData));
    }

    useEffect(() => {
        getWishList();
    }, );

    return <section className={'mt-5 pt-5 ' + wish.background}>
        <Helmet>
            <title>
                WishList
            </title>
        </Helmet>
        <div className="container py-5 cart-cover my-5">
            <h2 className='text-danger'>WishList <span className='fs-1 text-danger fw-bold'>❤ </span></h2>

            <h2 className='text-muted'>Number Of WishList Items :
                {wishListCount}
            </h2>
            {console.log(wishList)}
            {wishList?.data.map(function (product, index) {
                console.log(product);
                return <div className="row mb-5 border-bottom border-3 p-2" key={index}>
                    <div className="col-md-1 ">
                        <img className='w-100' src={product.imageCover} alt="" />
                    </div>
                    <div className="col-md-7">
                        <h6 className='text-muted'>{product.title}</h6>
                        <p className='main-color'>Price : {product.price} EGP <i className="fa-solid fa-sack-dollar ms-1"></i></p>
                        <h6 className='text-muted'>Quantity :  {product.quantity}</h6>
                        <h6 className='text-muted'>Sold :  {product.sold}</h6>

                    </div>
                    <div className="col-md-3 mx-auto">
                        <button onClick={() => deleteElementFromWishList(product._id)} className='btn btn-outline-danger me-5 edit-btn'>
                            💔
                            Delete</button>
                        <button onClick={() => { addProduct(product._id) }} className='btn text-white main-bg-color '>
                            🛒ADD To Cart</button >

                    </div>
                </div>
            })}



        </div>
    </section>
}
