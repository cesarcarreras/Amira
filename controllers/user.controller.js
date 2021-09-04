const User = require('../models/User');

exports.getAllUsers = (req, res) => {
    User.find()
    .then(users => res.status(200).json({users}))
    .catch(err => res.status(500).json({err}))
};

exports.updateUser = (req, res) => {
    const {id} = req.params
    User.findByIdAndUpdate(id, {...req.body}, {new:true})
    .then(user => res.status(200).json({user}))
    .catch(err => res.status(500).json({err}))
};
