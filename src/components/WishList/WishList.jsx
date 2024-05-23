import React, { useContext, useEffect } from 'react'
import { wishListContext } from '../../context/wishListContext'
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { cartContext } from '../../context/cartContext';
import wish from "./wishList.module.css"



export default function WishList() {

    const { numberOfWishListItems, wishListProduct, deleteProductFromWishList, setNumberOfWishListItems, setLikedProducts, setWishListCount } = useContext(wishListContext);
    const { addProductToCart } = useContext(cartContext);
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
        const res = await deleteProductFromWishList(id);
        if (res.status === "success") {
            toast.success(" 💔 Item Deleted Successfully from WishList");
            updateWishListState(res?.data)
        }
        else {
            toast.error("Item Deleted Error");
        }
        console.log(res);
    }
    function updateWishListState(wishlistData) {
        setNumberOfWishListItems(wishlistData.length);
        setLikedProducts(wishlistData);
        localStorage.setItem("wishlist", JSON.stringify(wishlistData));
    }
    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist"));
        if (storedWishlist) {
            setWishListCount(storedWishlist.length);
            setLikedProducts(storedWishlist);
        }
    }, [setWishListCount, setLikedProducts]);
    return <section className={'mt-5 pt-5 ' + wish.background}>
        <Helmet>
            <title>
                WishList
            </title>
        </Helmet>
        <div className="container py-5 cart-cover my-5">
            <h2 className='text-danger'>WishList <span className='fs-1 text-danger fw-bold'>❤ </span></h2>

            <h2 className='text-muted'>Number Of WishList Items : {numberOfWishListItems}</h2>

            {wishListProduct.map(function (product, index) {
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
