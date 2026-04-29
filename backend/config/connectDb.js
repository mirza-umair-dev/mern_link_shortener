import mongoose from "mongoose";

const connectDb = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        .then( ()=> {
            console.log('Mongodb Connected')
        })
    } catch (error) {
        console.error(error)
    }
}

export default connectDb;