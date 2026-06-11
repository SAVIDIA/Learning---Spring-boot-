exports.success = (message, data) => ({
  status: "SUCCESS",
  message,
  data
});

exports.failure = (message) => ({
  status: "FAILED",
  message,
  data: null
});