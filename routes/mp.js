const router = require('express').Router();
const { createPreference, feedback } = require('../controllers/mp.controller');

router.post('/create-preference',createPreference);
router.get('/feedback', feedback);

module.exports = router;