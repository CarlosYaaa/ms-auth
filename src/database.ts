import mongoose from 'mongoose';
import config from './settings/config';

export async function connectionDB() {
    await mongoose.connect(config.DB.MONGODB_URI)
    .then(db => {
        console.log(`Connected to MongoDB: ${db.connection.host}`);
    })
    .catch(err => {
        console.log("Error connecting to DB");
    })
}
