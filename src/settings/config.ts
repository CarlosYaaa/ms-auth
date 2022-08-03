export default {
    jwtSecret: process.env.JWT_SECRET,
    DB: {
        MONGODB_URI: process.env.MONGODB_URI,
    }
}