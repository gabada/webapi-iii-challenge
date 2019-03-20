//env
require('dotenv').config();

// code away!
const express = require('express');

const postRoutes = require('./posts/postRoutes.js');
const userRoutes = require('./users/userRoutes.js');

const port = process.env.PORT || 4000;
const server = express();

const cors = require('cors');
const helmet = require('helmet');

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use('/api/posts', postRoutes);
server.use('/api/users', userRoutes);

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
