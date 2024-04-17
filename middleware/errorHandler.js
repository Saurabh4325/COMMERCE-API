const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404).json({
        message: error.message,
        stack:error.stack
    });
};

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err?.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "production" ? "🥞" : err?.stack
    });
};

module.exports = {
    notFound,
    errorHandler
};
