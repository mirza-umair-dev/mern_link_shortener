import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
    OriginalUrl:{type:String,required:true},
    UrlId:{type:String,required:true,unique:true},
    Clicks:{type:Number,default:'0'}
},{timestamps:true})

export default mongoose.model('Url',UrlSchema);