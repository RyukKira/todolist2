const { Router } = require("express");
const UserModel = require("../models/user");
const { compare } = require("../util/checkPwd");
const { jwtSignIn } = require("../util/jwt");
const router = Router({ mergeParams: true });

router.post("/login", async (req, res) => {
  try {
    const data = req.body;
    const user = await UserModel.findOne({ email: data.email });
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }
    const validPassword = compare(data.password, user.password);
    if (!validPassword) {
      return res.status(400).send({ msg: "Invalid password" });
    }
    delete user.password;
    const response = { ...user.toObject() };
    response.tokens = await jwtSignIn(response);
    res.status(200).send({ msg: "OK", data: response });
  } catch (e) {
    throw new Error(`[User register]: ${e}`);
  }
});

module.exports = router;
