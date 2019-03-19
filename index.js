// code away!
const express = require('express');

const postRoutes = require('./posts/postRoutes.js');

const port = 5000;
const server = express();

server.use(express.json());
server.use('/api/posts', postRoutes);

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
