const router = require('express').Router();
const authCtrl = require('../controllers/authCtrl');

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.post('/logout', authCtrl.logout);
router.post('/findUser', authCtrl.findUser);
router.post('/follow', authCtrl.follow);
router.post('/following', authCtrl.following);
router.post('/unfollow', authCtrl.unfollow);
module.exports = router;
