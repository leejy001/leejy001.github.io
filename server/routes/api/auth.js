import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "../../middleware/auth.js";
import config from "../../config/index.js";
const { JWT_SECRET, GOOGLE_ID } = config;

import { OAuth2Client } from "google-auth-library";

// Model
import User from "../../models/user.js";

const router = express.Router();

// @routes  Post api/auth
// @desc    Auth user
// @access  public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Simple Validation
  if (!email || !password) {
    return res.status(400).json({ msg: "모든 필드를 채워주세요" });
  }

  //Check for existing user
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "유저가 존재하지 않습니다" });

    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ msg: "비밀번호가 일치하지 않습니다" });
      jwt.sign(
        { id: user.id },
        JWT_SECRET,
        { expiresIn: "2 days" },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
          });
        }
      );
    });
  });
});

const client = new OAuth2Client(GOOGLE_ID);

// @routes  Post api/auth/googlelogin
// @desc    Auth user
// @access  public
router.post("/googlelogin", (req, res) => {
  const { tokenId } = req.body;

  client
    .verifyIdToken({
      idToken: tokenId,
      audience: GOOGLE_ID,
    })
    .then((response) => {
      const { name, email, email_verified } = response.payload;
      if (email_verified) {
        User.findOne({ email }).then((user) => {
          if (!user) {
            const password = email;
            const newUser = new User({
              name,
              email,
              password,
            });
            newUser.save().then((user) => {
              jwt.sign(
                { id: user.id },
                JWT_SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email,
                      role: user.role,
                    },
                  });
                }
              );
            });
          } else {
            jwt.sign(
              { id: user.id },
              JWT_SECRET,
              { expiresIn: "2 days" },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                  },
                });
              }
            );
          }
        });
      }
    });
});

router.post("/logout", (req, res) => {
  res.json("로그아웃 성공");
});

router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) throw Error("유저가 존재하지 않습니다");
    res.json(user);
  } catch (e) {
    console.log(e, "no user");
    res.status(400).json({ msg: e.message });
  }
});

export default router;
