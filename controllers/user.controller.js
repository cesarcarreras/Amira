const User = require('../models/User');

exports.createUser = (req, res) => {
    User.create({...req.body})
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({err}))
};

exports.getAllUsers = (req, res) => {
    User.find()
    .then(users => res.status(200).json({users}))
    .catch(err => res.status(500).json({err}))
};

exports.oneUser = (req, res) => {
    const {id} = req.params
    User.findById(id)
    .then(user => res.status(200).json({user}))
    .catch(err => res.status(500).json({err}))
};

exports.updateUser = (req, res) => {
    const {id} = req.params
    User.findByIdAndUpdate(id, {...req.body}, {new:true})
    .then(user => res.status(200).json({user}))
    .catch(err => res.status(500).json({err}))
};

exports.deleteUser = (req, res) => {
    const {id} = req.params
    User.findByIdAndDelete(id)
    .then( () => res.status(200).json({msg: "Usuario borrado con éxito"}))
    .catch(err => res.status(500).json({err}))
};