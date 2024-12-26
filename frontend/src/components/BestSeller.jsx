import React,{useContext,useEffect,useState} from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const {products}= useContext(ShopContext);
    const [bestSeller,setBestSeller]= useState([]);

    {/* we are trying to filter among products which have bestseller as true */}
    useEffect(()=>{
        const bestProduct=products.filter((item)=>(item.bestseller));
        setBestSeller(bestProduct.slice(0,5));
    },[])

  return (
    <div className='my-10'>
       <div className='text-center text-3xl py-8'>
            <Title text1={"BEST"} text2={"SELLERS"}></Title>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Some of the Best Seller products
            </p>
       </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                bestSeller.map((item,index)=>{
                    return(
                        <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}></ProductItem>
                    )

                })
            }
        </div> 
    </div>
  )
}

export default BestSeller
