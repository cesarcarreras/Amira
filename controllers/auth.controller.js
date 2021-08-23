const User = require('../models/User');
const {createToken} = require('../helpers/jswt');
const passport = require('../helpers/passport');

const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend");

const mailersend = new MailerSend({
    api_key: process.env.API_MS,
});


exports.signUp = (req, res, next) => {
    const user = req.body
    User.register({...user}, user.password)
    .then(user => res.status(201).json({user}))
    .catch(err => res.status(500).json({err}))

    const recipients = [
        new Recipient(req.body.email)
    ];

    const variables = [
        {
            email: req.body.email,
            substitutions:
            [
                {var: "email", value: req.body.email},
            ]}
        ];

        console.log("que es esto:", req.body)

      const emailParams = new EmailParams()
      .setFrom("cesar@cesarcarreras.com")
      .setFromName("Amira Soap")
      .setRecipients(recipients)
      .setVariables(variables)
      .setSubject("¡Bienvenido! 🐶")
      .setTemplateId('v69oxl5d8z4785kw')

    mailersend.send(emailParams);
};

exports.login = (req, res, next) => {
    const {user} = req
    const [header, payload, signature] = createToken(user)

    res.cookie('headload', `${header}.${payload}`, {
        maxAge: 1000 * 60 * 30,
        httpOnly: true,
        sameSite: true
    })

    res.cookie('signature', signature, {
        httpOnly: true,
        sameSite: true
    })

    res.status(201).json({user})
};

exports.confirmationCode = async (req, res, next) => {
    const {confirmationCode} = req.params
    try{
        const user = await User.findByIdAndUpdate({confirmationCode}, {status: "ACTIVE"}, {new:true})
        console.log("user :", user)
        // res.redirect('http://localhost:3000/confirmation-page');
        res.status(200).json({result : user, msg: "Congrats, the user is now active"})
    } catch(error){
        res.status(400).json({error})
    }
};

exports.loggedUser = (req, res, next) => {
    const {user} = req
    res.status(200).json({user})
};

exports.logout = (req, res, next) => {
    res.clearCookie('heaload')
    res.clearCookie('signature')
    res.status(200).json({msg: '¡Vuelve pronto!'})
};

exports.googleInit = passport.authenticate('google', {
    scope : [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
        ]
});

exports.googleCallback = (req, res , next) => {

    passport.authenticate('google', { scope : ["profile", "email"]},
    (error, user) => {
        if(error){
            return res.status(400).json({error})
        }

        req.login(user, err => {
            if(err){
                return res.status(400).json({error : err})
            }
             res.status(200).json({result : user})
            // res.redirect('http://localhost:3000/profile')
        })
    })(req, res, next)
};