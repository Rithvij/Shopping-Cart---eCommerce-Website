import express from "express";
import { listProducts,addProduct,removeProduct,singleProduct } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";


const productRouter = express.Router();

//multer middleware to process the multi-part form data
productRouter.post("/add",adminAuth,upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
])
,addProduct);

// productRouter.post(
//     "/add",
//     upload.single("image1"), // Or `upload.fields` depending on setup
//     (req, res) => {
//         console.log("Body:", req.body);
//         console.log("Content-Type:", req.headers["content-type"]);
//         console.log("Files:", req.file || req.files);
//         if (!req.files) {
//             return res.status(400).send("No files received");
//         }
//         res.status(200).send("File upload successful");
//     }
// );

productRouter.post("/remove",adminAuth,removeProduct);
productRouter.post("/single",singleProduct);
productRouter.get("/list",listProducts);

export default productRouter