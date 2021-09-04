const router = require('express').Router();

const { getAllUsers, updateUser } = require('../controllers/user.controller');

router.get('/all-users', getAllUsers);
router.patch('/update-user/:id', updateUser);

module.exports = router;