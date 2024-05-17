import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const cartContext = createContext();

export default function CartContextProvider({ children }) {
    const [cartProduct, setCartProduct] = useState([]);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [numberOfCartItems, setNumberOfCartItems] = useState(0);
    const [CartId, setCartId] = useState(null);


    async function updateCounter(productId, counter) {
        try {
            if (counter < 0) {
                counter = 0
            }
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {
                    "count": counter
                },
                {
                    headers: { token: localStorage.getItem("tkn") }
                }
            )
            setCartProduct(data.data.products);
            setNumberOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);

            return data;
        } catch (error) {

        }
    }
    //delete Element 
    async function deleteProductFromCart(productId) {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                headers: { token: localStorage.getItem("tkn") }

            })
            setNumberOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);
            setCartProduct(data.data.products);
            return data
        } catch (error) {
            console.log("Error Happend", error);
        }
    }

    //add element
    async function addProductToCart(productId) {

        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
                "productId": productId
            },
                {
                    headers: { token: localStorage.getItem("tkn") }
                }
            )
            getUserCart();
            // setNumberOfCartItems(data.numOfCartItems);
            // setTotalCartPrice(data.data.totalCartPrice);
            // setCartProduct(data.data.products);
            return data;
        } catch (error) {
            console.log("error", error);
        }
    }
    //display elements
    async function getUserCart() {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: { token: localStorage.getItem("tkn") }
            })
            setNumberOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);
            setCartProduct(data.data.products);
            setCartId(data.data._id)
        } catch (error) {
            console.log("Error", error);
        }
    }

    // delete all cart
    async function removeCartData() {
        try {
            await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: { token: localStorage.getItem("tkn") }
            })
            setNumberOfCartItems(0);
            setTotalCartPrice(0);
            setCartProduct([]);
        } catch (error) {
            console.log("Error", error);
        }
    }
    //display element istead of useQuery
    useEffect(function () {
        getUserCart();
    }, [])

    return <cartContext.Provider value={{
        getUserCart,
        addProductToCart,
        cartProduct,
        totalCartPrice,
        numberOfCartItems,
        deleteProductFromCart,
        updateCounter,
        removeCartData,
        CartId,
        setCartProduct,
        setTotalCartPrice,
        setNumberOfCartItems
    }
    }>
        {children}

    </cartContext.Provider>
}