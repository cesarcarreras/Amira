const router = require('express').Router();
const passport = require('../helpers/passport');
const {verifyToken} = require('../helpers/jswt');
const {
    signUp,
    login,
    loggedUser,
    logout,
    confirmationCode,
    googleInit,
    googleCallback } = require('../controllers/auth.controller');

router.post('/signup', signUp);
router.post('/login', passport.authenticate('local'), login);
router.get('/logged-in', verifyToken, loggedUser);
router.get('/logout', logout);
// router.post('/edit/:id', editProcess);
router.get("/confirm/:confirmationCode", confirmationCode);
router.get('/google', googleInit);
router.get('/google/callback', googleCallback);

module.exports = router;