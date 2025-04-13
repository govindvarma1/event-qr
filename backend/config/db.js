import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to database successfully");
    } catch (err) {
        console.error(`The following error occurred: ${err}`);
        process.exit(1)
    }
}

export default connectDB;
