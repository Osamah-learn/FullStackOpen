const info = (...params) => {
  console.log("logger1",...params);
};

const error = (...params) => {
  console.error("logger2",...params);
};

module.exports = {
  info,
  error,
};
