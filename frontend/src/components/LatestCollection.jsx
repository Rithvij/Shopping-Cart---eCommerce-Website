import React, { useContext,useEffect,useState } from 'react'
import Title from './Title';
import ProductItem from './ProductItem';
import { ShopContext } from '../context/ShopContext.jsx';


const LatestCollection = () => {

    const {products} = useContext(ShopContext);
    const [latestProducts,setLatestProducts] = useState([]);
    
    {/* useEffect hook is used to perform data fetching,subscribing etc
        It runs after rendering and runs when the dependency changes */}
    useEffect(()=>{
         setLatestProducts(products.slice(0,10));
    },[products])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'Latest'} text2={'Collection'}></Title>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            
        </p>
      </div>

        {/* Rendering Products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                latestProducts.map((item,index)=>(
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}>

                        </ProductItem>
                ))
            }
        </div>
    </div>
  )
}

export default LatestCollection
