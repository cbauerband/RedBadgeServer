const router = require("express").Router();
const BookList = require("../db").import("../models/booklist");
const validateSession = require("../middleware/validate-session");

//USERS CREATE/POST A NEW BOOKLIST
router.post("/create", validateSession, (req, res) => {
  console.log(req.user);
  //   if (req.user.accounttype != "user") {
  //     res.json({
  //       message: "account type is not user",
  //     });
  //   }

  const listEntry = {
    listname: req.body.booklist.listname,
    listdescription: req.body.booklist.listdescription,
    owner: req.user.id,
  };

  BookList.create(listEntry)
    .then((booklist) => res.status(200).json(booklist))
    .catch((err) => res.status(500).json({ error: err }));
});

//GET ALL BOOKLISTS
router.get("/booklists", validateSession, (req, res) => {
  let userid = req.user.id;
  BookList.findAll({
    where: { owner: userid },
  })
    .then((booklist) => res.status(200).json(booklist))
    .catch((err) => res.status(500).json({ error: err.message }));
});

//GET ALL BOOKLISTS BY ID
router.get("/booklist/:id", validateSession, (req, res) => {
  //   if (req.user.accounttype != "user") {
  //     res.json({
  //       message: "account type is not user",
  //     });
  //   }
  let userid = req.params.id;
  console.log(userid);
  BookList.findAll({
    where: {
      owner: req.user.id,
    },
  })
    .then((booklists) => res.status(200).json(booklists))
    .catch((err) => res.status(500).json({ error: err }));
});

//UPDATE A BOOKLIST NAME OR DESCRIPTION
router.put("/updatelist/:id", validateSession, function (req, res) {
  //   if (req.user.accounttype != "user") {
  //     res.json({
  //       message: "account type is not user",
  //     });
  //   }
  const listEntry = {
    listname: req.body.booklist.listname,
    listdescription: req.body.booklist.listdescription,
    owner: req.user.id,
  };

  const query = { where: { id: req.params.id, owner: req.user.id } };

  BookList.update(listEntry, query).then((booklist) =>
    res.status(200).json({ booklist: booklist })
  );
});

//DELETE LIST
router.delete("/list/:id", validateSession, function (req, res) {
  //   if (req.user.accounttype != "user") {
  //     res.json({
  //       message: "account type is not user",
  //     });
  //   }
  const query = { where: { id: req.params.id, owner: req.user.id } };

  BookList.destroy(query) 
    .then(() =>
      res.status(200).json({ message: "The booklist has been removed" })
    ).catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
