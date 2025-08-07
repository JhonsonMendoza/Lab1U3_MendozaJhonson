const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {
  register,
  login
} = require('../controllers/auth.controller');

// Middleware para validar login tradicional
function validateLoginFields(req, res, next) {
  const {
    email,
    password
  } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: 'Email y contraseña son requeridos'
    });
  }
  next();
}

// Rutas tradicionales
router.post('/register', register);
router.post('/login', validateLoginFields, login);

// Rutas OAuth con Google
router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get('/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login'
  }),
  (req, res) => {
    // req.user es el mockUser que definiste en passport
    const userId = req.user.id;

    // Genera JWT con ese id
    const token = jwt.sign({
        userId: req.user._id,
        email: req.user.email,
        name: req.user.name
      },
      process.env.JWT_SECRET, {
        expiresIn: '1h'
      }
    );


    res.redirect(`http://127.0.0.1:5500/frontend/auth-callback.html?token=${token}`);
  }
);


module.exports = router;