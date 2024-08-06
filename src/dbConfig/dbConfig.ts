import mongoose from "mongoose";


export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connectiton

        connection.on('connected', () => {
            console.log('MongoDB connected');
        })

        connection.on('error', () => {
            console.log("Mongoose connection error, Plese make sure db is up and running" );
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong in connecting db");
        console.log(error);
    }
}