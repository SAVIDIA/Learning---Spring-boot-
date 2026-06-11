module.exports = (
  err,
  req,
  res,
  next
) => {
  console.error(err);

  const statusCode =
    err.statusCode || 500;

  const isProduction =
    process.env.NODE_ENV === "production";

  res.status(statusCode).json({
    status: "FAILED",
    message: isProduction
      ? "Internal Server Error"
      : err.message,
    data: null
  });
};