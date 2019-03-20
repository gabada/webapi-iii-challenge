//env
require('dotenv').config();

// code away!
const express = require('express');

const postRoutes = require('./posts/postRoutes.js');
const userRoutes = require('./users/userRoutes.js');

const port = process.env.PORT || 4000;
const server = express();

const cors = require('cors');

server.use(express.json(), cors());
server.use('/api/posts', postRoutes);
server.use('/api/users', userRoutes);

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
