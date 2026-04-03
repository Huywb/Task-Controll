import mongoose from "mongoose"

export const ConnectDB = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
        if(!connect){
            console.log("Error connect DB ")
        }
        console.log("Conencting DB at ",connect.connection.host)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}