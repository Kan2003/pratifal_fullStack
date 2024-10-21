import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const verifyJwt = asyncHandler(async (req , res , next) => {
    try {
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');

        // console.log('token',token );

        if(!token){
            throw new ApiError(401 , 'unauthozied request')
        }

        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select('-password -refreshToken')
    
        if(!user){
            throw new ApiError(401 , 'user not found')
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401 , error?.message || 'invalid token')
    }
})


export default verifyJwt;