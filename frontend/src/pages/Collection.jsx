import React, { useContext,useState,useEffect } from 'react'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext.jsx'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {

  const {products,search,showSearch} = useContext(ShopContext);
  const [showFilter,setShowFilter]=useState(false);
  const [filterProducts,setFilterProducts]=useState([]);
  const [category,setCategory]=useState([]);
  const [subCategory,setSubCategory]=useState([]);
  const [sortType,setSortType]=useState("relevant");

  const toggleCategory =(e)=>{
    {/* if item is included already, we have toggled it to remove so we remove here */}
    if(category.includes(e.target.value)){
      setCategory((prev)=>{
        return(prev.filter(item=> item!== e.target.value))
      })
    }
    
    else{
      setCategory((prev)=>{
        return([...prev,e.target.value])
      })
    }
  }

  const toggleSubCategory= (e) =>{
    if(subCategory.includes(e.target.value)){
      setSubCategory((prev)=>{
        return(prev.filter(item=> item!== e.target.value))
      })
    }
    else{
      setSubCategory((prev)=>{
        return([...prev,e.target.value])
      });
    }
  }

  const applyFilter =()=>{
    let productCopy=products.slice();

    if(category.length>0){
      productCopy=productCopy.filter((item)=> category.includes(item.category));
    }
    if(subCategory.length>0)
    {
      productCopy=productCopy.filter((item)=> subCategory.includes(item.subCategory));
    }
    if(showSearch && search)
    {
      productCopy=productCopy.filter((item)=> item.name.toLowerCase().includes(search.toLowerCase()))
    }
    setFilterProducts(productCopy);
  }

  const sortProduct = ()=>{
    let fpcopy=filterProducts.slice();

    switch(sortType){
      case "low-high":
        setFilterProducts(fpcopy.sort((a,b)=>{return(a.price-b.price)}));
        break;
      
      case "high-low":
        setFilterProducts(fpcopy.sort((a,b)=>{return(b.price-a.price)}));
        break;

      default:
        applyFilter();
        break;
    }
  }


  useEffect(()=>{
    //console.log(category);
  },[category])

  useEffect(()=>{
    //console.log(subCategory);
  },[subCategory])

  useEffect(()=>{
    applyFilter();
  },[category,subCategory,search,showSearch,products])

  useEffect(()=>{
    sortProduct();
  },[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
        {/* Filter Options */}
        <div className='min-w-60'>
          <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
            <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt=""></img>
          </p>
          {/* Category Filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '': 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory}></input>Men
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory}></input>Women
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory}></input>Kids
              </p>
            </div>
          </div>

          {/* Sub-category filter */}
          <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '': 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory}></input> Topwear
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}></input>Bottomwear
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}></input> Winterwear
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className='flex-1'>
          <div className='flex justify-between text-base sm:text 2xl mb-4'>
              <Title text1={"ALL"} text2={"COLLECTIONS"}></Title>
              {/*Product sort */}
              <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
                <option  value="relevant">Sort By : Relevant</option>
                <option  value="low-high">Sort By: Low to High</option>
                <option  value="high-low">Sort By : High to Low</option>
              </select>
          </div>
          {/* Map products */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
              {
                filterProducts.map((item,index)=>{
                  return (<ProductItem key={index} name={item.name} 
                  id={item._id} price={item.price} image={item.image}>
                  </ProductItem>);
                })
              }
          </div>
        </div>
    </div>
  )
}

export default Collection
