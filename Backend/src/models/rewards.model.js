import {mongoose , Schema} from 'mongoose';

const rewardSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    couponCode : {
        type : String,
        required : true,
        index : true
    },
    redeemed: {
        type : Boolean,
        default : false
    },
    expiryDate: {
        type : Date,
        required : true
    },
    starred : {
        type : Boolean,
        default : false
    },
    owner: {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
},{timestamps : true})



export const Reward = mongoose.model('Reward',rewardSchema)