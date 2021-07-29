const { checkToken } = require("../util/jwt");

const checkAuth = async (req, res, next) => {
  const token = req.headers["authorization"];
  try {
    req.session = await checkToken(token);
    next();
  } catch (e) {
    res.status(401).send({ msg: "Unauthorized" });
  }
};

module.exports = checkAuth;
