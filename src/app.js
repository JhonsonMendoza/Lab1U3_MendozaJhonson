require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db');
const passport = require('passport');
require('./config/passport-setup'); // nueva línea

const authRoutes = require('./api/routes/auth.routes');

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { cors: { origin: '*' } });

const chatHandler = require('./infrastructure/websockets/chat.handler');

app.use(cors());
app.use(express.json());
connectDB();

app.use(passport.initialize()); // nueva línea

app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes); // ruta para OAuth combinada

chatHandler(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));
