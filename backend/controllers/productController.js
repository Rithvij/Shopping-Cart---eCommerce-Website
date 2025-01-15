import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js";

//Function for Add product
const addProduct = async (req,res)=>{
    try{
        const {name,description,price,category,subCategory,sizes,bestseller} = req.body;
        //stored only when available
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1,image2,image3,image4].filter((item)=> item!==undefined)
         
        //storing image paths in cloudinary
        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type : 'image'})
                return result.secure_url
            })  
        )

        const productData ={
            name,
            description,
            category,
            price : Number(price),
            subCategory,
            bestseller : bestseller === "true" ? true : false,
            sizes : JSON.parse(sizes),
            image : imagesUrl,
            date : Date.now()
        }
        console.log(productData);
        
        const product = new productModel(productData);
        await product.save()
      
        //const image1 = req.files?.image1?.[0]; // Use optional chaining to avoid errors
        // const image2 = req.files?.image2?.[0];
        // const image3 = req.files?.image3?.[0];
        // const image4 = req.files?.image4?.[0];

        //console.log(name,description,price,category,subCategory,sizes,bestseller);
        //console.log("req.files:", req.files);
        //console.log(imagesUrl)
        res.json({success:true,message : "Product added"});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:err.message})
    }
}

//Function for List Products
const listProducts = async (req,res)=>{
    try {
        const products = await productModel.find({});
        res.json({success:true,products})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//Function for removing product
const removeProduct = async (req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"product removed"})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//Function for single product info
const singleProduct = async (req,res)=>{
    try {
        const {productId } = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
    
}



// Update first 6 products with bestseller: true
// const updateFirst6Products = async () => {
//   try {
//     // Find first 6 products
//     const products = await productModel.find();

//     // Extract product IDs
//     //const ids = products.map(product => product._id);
//     // const names = products.map((item)=>item.name.split(" ")[0])
//     // const namesfilt = products.filter((item)=>item.name.split(" ")[0] === "Women")

    
//     // const womenfilter = products.filter((item)=>item.name.split(" ")[0] === "Women")
//     // const womenId = womenfilter.map((item)=> item._id)
//     // console.log(womenId);
//     // const result = await productModel.updateMany({_id : {$in : womenId}},{category : "Women"})
    
//     const kidsfilter = products.filter((item)=>item.name.split(" ")[0] === "Boy" || item.name.split(" ")[0] === "Girls" || item.name.split(" ")[0] === "Kid")
//     const kidsId = kidsfilter.map((item)=> item._id)
//     console.log(kidsfilter.length);
//     const result = await productModel.updateMany({_id : {$in : kidsId}},{category : "Kids"})
    
//     //console.log(names)



//     // Update those products
//     // const result = await productModel.updateMany(
//     //   { _id: { $in: ids } },
//     //   { $set: { bestseller: true } }
//     // );
//     // const result = await productModel.updateMany(
//     //     {_id : {$in : ids}},{$set : {bestseller : false}}
//     // );
//     //const result = await productModel.updateMany({name : "Women"})

//     // console.log(`Successfully updated ${result.nModified} products.`);
//   } catch (error) {
//     console.error("Error updating products:", error);
//   }
// };

// updateFirst6Products();


export {addProduct,listProducts,removeProduct,singleProduct}