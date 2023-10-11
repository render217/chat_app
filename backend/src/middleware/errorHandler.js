exports.errorHandler = (err, req, res, next) => {
  console.log("==============ERROR================");
  console.log(err);
  res.send({ message: err.message || "Something went wrong" });
};
