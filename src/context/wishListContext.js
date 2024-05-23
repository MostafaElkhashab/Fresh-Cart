import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const wishListContext = createContext()

export default function WithListProvider({ children }) {

    // const [wishListProduct, setWishListProduct] = useState([]);
    // const [numberOfWishListItems, setNumberOfWishListItems] = useState(0);
    const [likedProducts, setLikedProducts] = useState([]);
    const [wishListCount, setWishListCount] = useState(0);
    async function addProductToWishList(productId) {

        try {
            return await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", {
                "productId": productId
            },
                {
                    headers: { token: localStorage.getItem("tkn") }
                }
            )

        } catch (error) {
            console.log("error", error);
        }
    }

    async function getUserWishList() {
        try {
            return await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers: { token: localStorage.getItem("tkn") }
            })

        } catch (error) {
            console.log("Error", error);
        }
    }

    async function deleteProductFromWishList(productId) {
        try {
            return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
                headers: { token: localStorage.getItem("tkn") }

            })


            // return data
        } catch (error) {
            console.log("Error Happend", error);
        }
    }
    useEffect(function () {
        getUserWishList();
    }, [])
    return <wishListContext.Provider value={{
        addProductToWishList,
        getUserWishList,
        // numberOfWishListItems,
        // wishListProduct,
        deleteProductFromWishList,
        likedProducts,
        setLikedProducts,
        wishListCount,
        setWishListCount,
        
        // setNumberOfWishListItems,
        // setWishListProduct
    }}>


        {children}
    </wishListContext.Provider>
}
