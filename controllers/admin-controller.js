const router = require("express").Router();
let Admin = require("../db").import("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//SIGNUP
router.post("/registerAdmin", function (req, res) {
  Admin.create({
    firstName: req.body.admin.firstName,
    lastName: req.body.admin.lastName,
    username: req.body.admin.username,
    passwordHash: bcrypt.hashSync(req.body.admin.passwordHash, 13),
  })
    .then(function userSuccess(admin) {
      let token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 48,
      });
      res.json({
        username: user,
        message: "Admin successfully created",
        sessionToken: token,
      });
    })
    .catch((err) => res.send(err));
});
//LOGIN
router.post("/loginAdmin", function (req, res) {
  Admin.findOne({
    where: {
      username: req.body.admin.username,
    },
  }).then(function loginSuccess(admin) {
    if (admin) {
      bcrypt.compare(req.body.admin.passwordHash, admin.passwordHash, function (
        err,
        matches
      ) {
        if (matches) {
          let token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 48,
          });
          res.status(200).json({
            admin: admin,
            message: "Admin successfully logged in",
            sessionToken: token,
          });
        } else {
          res.status(502).send({ error: "Login Failed" });
        }
      });
    } else {
      res.status(500).json({ err: error });
    }
  });
});

//GET admin info
router.get("/adminInfo/:id", (req, res) => {
  let id = req.params.id;
  Admin.findAll({
    where: { id: id },
  })
    .then((admin) => res.status(200).json(admin))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
