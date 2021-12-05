module.exports = {
    server: {
        port: process.env.SERVER_PORT || "3001"
    },
    logging: {
        level: process.env.LOG_LEVEL || "info"
    },
    db: {
        uri: "mongodb://sa:123@localhost:27018/coworkersDB?retryWrites=true"
    }
}