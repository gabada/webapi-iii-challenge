// code away!
const express = require('express');

const postRoutes = require('./posts/postRoutes.js');
const userRoutes = require('./users/userRoutes.js');

const port = 5000;
const server = express();

server.use(express.json());
server.use('/api/posts', postRoutes);
server.use('/api/users', userRoutes);

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
