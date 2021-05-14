import jwt from "jsonwebtoken";
import config from "../config/index.js";

const { JWT_SECRET } = config;

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(400).json({ msg: "토크 없음... 인증 거부" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "유효하지 않은 토큰" });
  }
};

export default auth;
