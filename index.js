// code away!
const express = require('express');

const port = 5000;
const server = express();

server.use(express.json());

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
