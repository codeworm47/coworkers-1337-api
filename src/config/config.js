module.exports = {
    auth:{
        enabled: process.env.AUTH_ENABLED || false,
        jwtSecret: process.env.JWT_SECRET
    },
    server: {
        port: process.env.SERVER_PORT || "3001"
    },
    logging: {
        level: process.env.LOG_LEVEL || "info"
    },
    db: {
        uri: process.env.MONGO_URI
    }
}