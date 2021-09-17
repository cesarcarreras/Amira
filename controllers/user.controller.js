const User = require('../models/User');

const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend");

const mailersend = new MailerSend({
    api_key: process.env.API_MS,
});

exports.createUser = async (req, res) => {
    try {
        const user = await User.create({...req.body})

        const recipients = [
            new Recipient(user.email)
        ];

        const variables = [
            {
                email: user.email,
                substitutions:
                [
                    {var: "email", value: user.email},
                    {var: "name", value: user.name}
                ]}
            ];

            const emailParams = new EmailParams()
            .setFrom("hola@cesarcarreras.com")
            .setFromName("Amira Soap")
            .setRecipients(recipients)
            .setVariables(variables)
            .setSubject("¡Bienvenido! 🧼")
            .setTemplateId('z86org8mrklew137')

            mailersend.send(emailParams)

            res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error})
    }

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