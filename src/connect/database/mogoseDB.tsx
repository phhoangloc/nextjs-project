import mongoose from "mongoose"

const connectMongoDB = async () => {

    await mongoose.connect("mongodb+srv://lockheart:RAZz8rsNILo88Smq@cluster0.qs9wtoh.mongodb.net/mybook?retryWrites=true&w=majority")
        .catch((error) => {
            throw error.message
        })
        .then(() => {
            console.log("connect mongodb success! ")
        })

}
export default connectMongoDB;