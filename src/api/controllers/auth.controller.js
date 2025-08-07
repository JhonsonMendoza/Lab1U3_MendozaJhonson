const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../domain/models/user.model');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashed });
    res.status(201).json({ message: 'Usuario registrado', id: newUser._id });
  } catch (e) {
    res.status(400).json({ error: 'Error al registrar usuario' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (e) {
    res.status(500).json({ error: 'Error en login' });
  }
};
