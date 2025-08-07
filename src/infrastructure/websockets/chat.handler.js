const jwt = require('jsonwebtoken');
const Message = require('../../domain/models/message.model');
const User = require('../../domain/models/user.model');

const connectedUsers = new Set(); // para llevar el conteo

const chatHandler = (io) => {
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.userId;
      next();
    } catch {
      next(new Error('Token inválido'));
    }
  });

  io.on('connection', async (socket) => {
    console.log(`🔌 Usuario conectado: ${socket.userId}`);
    connectedUsers.add(socket.userId);

    // Emitir el número actualizado de usuarios conectados
    io.emit('userCount', connectedUsers.size);

    socket.on('sendMessage', async (text) => {
      const message = await Message.create({
        text,
        user: socket.userId,
      });
      const user = await User.findById(socket.userId);

      io.emit('newMessage', {
        text: message.text,
        user: user.email,
        userId: user._id.toString(),
        createdAt: message.createdAt,
      });
    });

    socket.on('disconnect', () => {
      connectedUsers.delete(socket.userId);
      io.emit('userCount', connectedUsers.size);
      console.log(`❌ Usuario desconectado: ${socket.userId}`);
    });
  });
};

module.exports = chatHandler;
