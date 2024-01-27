const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

//REGISTER
router.post("/register", async (req, res) => {
  console.log(req);

  await User.create({
    username: req.body.username,
    password: req.body.password,
    passwordSession: req.body.sessionNumber,
  })
    .then((user) => {
      console.log(user);
      res.status(201).json("user registered successfully !!");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//LOGIN
router.post("/login", async (req, res) => {
  console.log(req);
  try {
    const user = await User.findOne({
      where: {
        username: req.body.userName,
      },
    });
    const finalPassword = CryptoJS.SHA256(req.body.password).toString();
    finalPassword !== user.password &&
      res.status(401).json("Wrong Password !!!");

    let session = user.passwordSession;
    session = session - 1;
    if (session == 0) {
      await User.destroy({
        where: {
          username: user.username,
        },
      });
      res.status(200).json({ login_res: 0 });
    } else {
      await User.update(
        {
          password: req.body.password,
          passwordSession: session,
        },
        {
          where: { username: user.username },
        }
      );
      res.status(200).json({ login_res: 1 });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//SESSION
router.post("/getSessionId", async (req, res) => {
  console.log(req);
  try {
    const user = await User.findOne({
      where: {
        username: req.body.userName,
      },
    });
    !user && res.status(401).json("Wrong UserName !!!");

    res.status(200).json({
      userName: user.username,
      session: user.passwordSession,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
