const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validatorResult } = require('express-validator/check'); 

const User = require('../../models/User');

// @route GET api/users
// desc Test route
// @access Public

router.post('/', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validatorResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const { name, email, password,  } = req.body;

        try {
           let user = await User.findOne({ email });

           if( user ) {
               res.status(400).json({ erros : [{ msg: 'User already exists '}] });
           } 

           const avatar = gravatar.url(email, {
               s : '200',
               r: 'pg',
               d: 'mm'
           });

           user = new User({
               name,
               email,
               avatar,
               password
           });
           
           const salt = await bcrypt.genSalt(10);

           user.password = await bcrypt.hash(password, salt);
           
           await user.save();

            // Return JSONwebToken
            res.send('User Registered..');
        } catch (err) {
            console.error(err.message);
            res.status(500).send(" Server Error Message....")
        }
        
        
    }
);

module.exports = router;

