import { createContext, useEffect } from "react";
import {products} from "../assets/assets"
import { useState } from "react";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency='$';
    const delivery_fee=10;
    const [search,setSearch]=useState('');
    const [showSearch,setShowSearch] = useState(false);
    const [cartItems,setCartItems]=useState({});

   

    const addToCart=async (itemId,size)=>{
        //creates a copy of cartItems
        let cartData=structuredClone(cartItems);

        if(!size)
        {
            toast.error("Select Product Size");
        }

        else if(cartData[itemId])
        {
            //if same size(let "L" exists) then just add 1
            if(cartData[itemId][size])
            {
                cartData[itemId][size]+=1;
            }
            //if same item id exists with diff size
            else{
                cartData[itemId][size]=1;
            }
        }
        else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }

        setCartItems(cartData);
    }

    const getCartCount=()=>{
        let totalCount=0;
        for(const items in cartItems)
        {
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item]>0){
                        totalCount+=cartItems[items][item];
                    }
                }
                catch(error)
                {
                    console.log(error);
                }
            }
        }
        return totalCount;
    }

    const updateQuantity=async (itemId,size,quantity)=>{
            let cartData=structuredClone(cartItems);

            cartData[itemId][size]=quantity;
            setCartItems(cartData);
    }

    // useEffect(()=>{
    //     console.log(cartItems)
    // },[cartItems])
    
    const value={
        products, currency, delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart, getCartCount,updateQuantity
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}
export default ShopContextProvider;
