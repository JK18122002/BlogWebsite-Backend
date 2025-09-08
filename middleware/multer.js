import multer from "multer";

const storage = multer.memoryStorage(); // store file in memory
export const singleUpload = multer({ storage }).single("file"); // for single file upload
