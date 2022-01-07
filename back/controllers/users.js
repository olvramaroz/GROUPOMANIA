require("dotenv").config();
const jwt = require('jsonwebtoken');

const newToken = user => {
    token = jwt.sign({ userId: user.id }, 'RANDOM_TOKEN_SECRET', {
      expiresIn: '24h'
    })
    return { user, token }
  }

exports.signup = (req, res, next) => {
    User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
      .then(user => res.status(201).json(newToken(user)))
      .catch(error => res.status(401).json({ error: error }))
  }
  
  exports.login = async (req, res, next) => {
    try {
      const response = await User.authenticate(req.body.email, req.body.password)
  
      if (response.valid) {
        res.status(201).json(newToken(response.user))
      } else {
        res.status(401).json({ error: response.message })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }