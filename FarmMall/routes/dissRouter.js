const router = require('express').Router();
const dissCtrl = require('../controllers/dissCtrl');

router.post('/addDetails', dissCtrl.addDetails);
router.get('/showDiscussions', dissCtrl.showDetails);
// router.post('/logout', authCtrl.logout);

module.exports = router;
