const jswt = require('jsonwebtoken');
const User = require('../models/User');

exports.createToken = (user) => {
    return jswt.sign({
        userId: user._id,
        email: user.email,
        role: user.role
    }, process.env.SECRET, {expiresIn: '24h'}).split('.')
};

exports.verifyToken = (req, res, next) => {
    const {headload, signature} = req.cookies

    if(!headload || !signature) res.status(401).json({msg: 'No tienes un token válido'})
    jswt.verify(`${headload}.${signature}`, process.env.SECRET, (error, decoded) => {
        if(error) res.status(401).json({msg: 'No tienes un token válido'})
        User.findById(decoded.userId)
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => {
            res.status(401).json(err)
            next()
        })
    });
};