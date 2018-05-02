const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

//load User model
const User = require('../../models/User');

//@route    GET api/users/test
//@desc     tests users route
//@access   Public
router.get('/test', (req,res) =>{
    res.json({
        msg: 'Users works'
    });
});
//@route    GET api/users/register
//@desc     register a user
//@access   Public
router.post('/register', (req, res)=>{
    User.findOne({email: req.body.email})
        .then(user =>{
            if (user){
                return res.status(400).json({email: 'Email already exists'});
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s:'200', //size
                    r:'pg',  //rating
                    d:'mm'   //default image
                });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err, salt)=>{
                    if (err) throw err;
                    bcrypt.hash(newUser.password, salt, (err, hash) =>{
                        if (err) {throw err;}
                        newUser.password = hash;
                        newUser.save()
                            .then(user=>res.json(user))
                            .catch(err=> {throw err;});
                    });
                });
            }
        });
});

//@route    GET api/users/login
//@desc     login users / return JWT token
//@access   Public
router.post('/login', (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email})
        .then(user=> {
            //check for user
            if(!user){
                return res.status(404).json({email: 'User email does not exist'});
            }

            //check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch){
                        //user matched
                        //create jwt payload
                        const payload = { 
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        };
                        //sign token                        
                        jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err, token)=>{
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        });
                    } else {
                        return res.status(400).json({password: 'Password incorrect'});
                    }
                });
        });
});


module.exports = router;