const errorHandler = (error, req, res, next) => {
    console.log("Error handler");
    console.error(error.stack); // Вивести помилку в консолі
    const statusCode = error.status;
    if (error.name === 'ValidationError') {
        console.log("validation error");
        const errorMessages = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: "Validation Error", errors: errorMessages });
    }

    if (statusCode && statusCode !== 500) {
        res.status(statusCode).json({
            message: error.message,
            // stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        });
    }
    res.status(500).json("Something went wrong");
}

module.exports = errorHandler;

