const router = require('express').Router();

const { getAllUsers, updateUser, createUser, deleteUser } = require('../controllers/user.controller');

router.get('/all-users', getAllUsers);
router.post('/create-user', createUser);
router.patch('/update-user/:id', updateUser);
router.delete('/delete-user/:id', deleteUser)

module.exports = router;