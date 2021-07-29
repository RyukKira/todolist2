const { Router } = require("express");
const UserModel = require("../models/user");
const router = Router({ mergeParams: true });

router.post("/register", async (req, res) => {
  try {
    const data = req.body;
    const savedUser = await UserModel.create(data);
    console.log(savedUser);
    res.status(200).send({ ...savedUser.toObject() });
  } catch (e) {
    throw new Error(`[User register]: ${e}`)
  }
});


module.exports = router;