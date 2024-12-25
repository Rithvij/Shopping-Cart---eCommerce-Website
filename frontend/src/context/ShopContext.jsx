import { createContext, useEffect } from "react";
import {products} from "../assets/assets"
import { useState } from "react";
import { useLocation } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency='$';
    const delivery_fee=10;
    const [search,setSearch]=useState('');
    const [showSearch,setShowSearch] = useState(false);

    const value={
        products, currency, delivery_fee,
        search,setSearch,showSearch,setShowSearch
    }
    

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}
export default ShopContextProvider;