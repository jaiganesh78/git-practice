// errorHandlingMiddleware.js

const errorHandler = (err, req, res, next) => {
  console.error("🔥 Error caught:", err);

  // Default values
  let statusCode = res.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // 1️⃣ Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError") {
    message = `Invalid ${err.path}: ${err.value}`;
    statusCode = 400;
  }

  // 2️⃣ Mongoose ValidationError
  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    statusCode = 400;
  }

  // 3️⃣ MongoDB duplicate key error (11000)
  if (err.code && err.code === 11000) {
    const field = Object.keys(err.keyValue);
    message = `Duplicate value entered for ${field}`;
    statusCode = 400;
  }

  // 4️⃣ JWT errors
  if (err.name === "JsonWebTokenError") {
    message = "Invalid token. Please log in again.";
    statusCode = 401;
  }

  if (err.name === "TokenExpiredError") {
    message = "Token expired. Please log in again.";
    statusCode = 401;
  }

  // 5️⃣ Multer file upload errors
  if (err.name === "MulterError") {
    message = `File upload error: ${err.message}`;
    statusCode = 400;
  }

  // 6️⃣ Optional: Other custom error properties
  if (err.statusCode) {
    statusCode = err.statusCode;
  }

  // 7️⃣ Fallback for unexpected errors
  if (!message) message = "Internal Server Error";

  // 8️⃣ Send JSON response
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
