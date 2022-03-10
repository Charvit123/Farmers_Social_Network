const router = require("express").Router();
const dissCtrl = require("../controllers/dissCtrl");

router.post("/addDetails", dissCtrl.addDetails);
router.get("/showDiscussions", dissCtrl.showDetails);
router.get("/search", dissCtrl.search);
router.post("/userPost", dissCtrl.usersPost);
router.post("/deletePost", dissCtrl.deletePost);
// router.post('/logout', authCtrl.logout);

// router.post('/logout', authCtrl.logout);
router.post("/userPost", dissCtrl.usersPost);
router.post("/addComment", dissCtrl.addComment);
router.post("/comment", dissCtrl.comment);
router.post("/deleteCmnt", dissCtrl.deleteCmnt);

module.exports = router;
