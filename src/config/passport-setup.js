const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../domain/models/user.model'); // ajusta la ruta si cambia

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;

    // ✅ Buscar por email primero
    let user = await User.findOne({ email });

    if (!user) {
      // Si no existe, lo creamos
      user = await User.create({
        googleId: profile.id,
        email,
        name: profile.displayName,
        authProvider: 'google' // opcional si manejas múltiples proveedores
      });
    } else if (!user.googleId) {
      // ⚠️ El usuario ya existe por login tradicional, pero aún no tiene googleId
      user.googleId = profile.id;
      await user.save(); // lo actualizamos
    }

    return done(null, user);
  } catch (err) {
    console.error("Error en estrategia de Google:", err);
    return done(err, false);
  }
}));
