const { sign, verify } = require("jsonwebtoken");

const createToken = async (payload, expiresIn) => {
  const key = process.env.JWT_SECRET || "123456789";
  return sign(payload, key, {
    expiresIn,
    algorithm: "HS512",
  });
};

async function jwtSignIn(user) {
  const expiredAccessToken = process.env.JWT_ACCESS_TOKEN_T || 3600;
  const expiredRefrehToken = process.env.JWT_ACCESS_TOKEN_T || 36000;
  try {
    const accessToken = await createToken(user, +expiredAccessToken);
    const refreshToken = await createToken(user, +expiredRefrehToken);

    return { accessToken, refreshToken };
  } catch (e) {
    throw new Error(`JWT jwtSignIn error: ${e}`);
  }
}

async function checkToken(token) {
  const key = process.env.JWT_SECRET || "123456789";
  return verify(token, key);
}

module.exports = { jwtSignIn, checkToken };
