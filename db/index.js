import mongoose from "mongoose";

const connectDB = async()=>{

try {
   const connectIntance = await mongoose.connect(`mongodb+srv://saadumer5476:aaSSddFF%40123%23@quickbook-cluster-1.oszgu.mongodb.net/?retryWrites=true&w=majority&appName=QuickBook-cluster-1/quickbookDB`)
   console.log(`Database Connected Successfully !! DB host: ${connectIntance.connection.host}`);

} catch (error) {
    console.log(`MongoDB connection Failed: ${error}`)
    process.exit(1)
}

}

export default connectDB