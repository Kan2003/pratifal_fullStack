import {v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'


dotenv.config()
cloudinary.config({ 
    cloud_name: process.env.CLOUDNARY_NAME, 
    api_key: process.env.CLOUDNARY_API_KEY, 
    api_secret: process.env.CLOUDNARY_API_SECRET
});



const uploadImage = async (filePath) => {
    try {

        if(!filePath) return null;
        //upload the file to cloudinary
        const res = await cloudinary.uploader.upload(filePath, {
            resource_type : 'auto'
        })
        // console.log("file is uploaded to cloudinary",res.url);
        fs.unlinkSync(filePath); // remove the locally saved temp file
        return res;

    } catch (error) {
        fs.unlinkSync(filePath); // remove the locally saved temp file as upload operation got failed
        return null;
    }
}

const deleteImage = async(fileUrl) => {
    if (!fileUrl) return null;

    // Extract publicId (assuming images are in the 'home' folder or no folder)
    const urlSegments = fileUrl.split('/');
    const fileNameWithExtension = urlSegments[urlSegments.length - 1];
    const publicIdWithoutExtension = fileNameWithExtension.split('.')[0];

    const publicId = `${publicIdWithoutExtension}`;

    console.log("Public ID to be deleted:", publicId);

    try {
        const result = await cloudinary.uploader.destroy(publicId, { resource_type: "image", invalidate: true });
        console.log(result);

        if (result.result === 'ok') {
            console.log(`Image with public ID ${publicId} deleted successfully`);
        } else {
            console.error(`Failed to delete image: ${result.result}`);
        }

        return result;
    } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
        return null;
    }
}


export {uploadImage , deleteImage}