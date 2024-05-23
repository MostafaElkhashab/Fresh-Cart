import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const wishListContext = createContext()

export default function WithListProvider({ children }) {

    const [wishListProduct, setWishListProduct] = useState([]);
    const [numberOfWishListItems, setNumberOfWishListItems] = useState(0);
    const [likedProducts, setLikedProducts] = useState([]);
    const [wishListCount, setWishListCount] = useState(0);
    async function addProductToWishList(productId) {

        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", {
                "productId": productId
            },
                {
                    headers: { token: localStorage.getItem("tkn") }
                }
            )
            getUserWishList();
            return data;
        } catch (error) {
            console.log("error", error);
        }
    }

    async function getUserWishList() {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers: { token: localStorage.getItem("tkn") }
            })
            setNumberOfWishListItems(data.count);

            setWishListProduct(data.data);
            // getUserWishList();

        } catch (error) {
            console.log("Error", error);
        }
    }

    async function deleteProductFromWishList(productId) {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
                headers: { token: localStorage.getItem("tkn") }

            })
            setNumberOfWishListItems(data.count);
            // getUserWishList();
            // setWishListProduct(data.data);

            return data
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
        numberOfWishListItems,
        wishListProduct,
        deleteProductFromWishList,
        likedProducts,
        setLikedProducts,
        wishListCount,
        setWishListCount,
        setNumberOfWishListItems
    }}>


        {children}
    </wishListContext.Provider>
}
