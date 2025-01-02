import multer from "multer";
// import fs from "fs";
// import path from "path";

// const uploadDir = path.resolve("uploads");
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

const storage = multer.diskStorage({
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})

const upload = multer({storage})

// export default upload

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         const uploadPath = path.resolve("uploads"); // Specify 'uploads' folder
//         callback(null, uploadPath);
//     },
//     filename: (req, file, callback) => {
//         callback(null, `${Date.now()}-${file.originalname}`); // Add a unique timestamp
//     },
// });

// const upload = multer({ storage });

export default upload;