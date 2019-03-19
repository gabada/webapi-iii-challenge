const express = require('express');
const db = require('../data/helpers/userDb.js');

const router = express.Router();

router.post('/', (req, res) => {
  const { name } = req.body;
  const newUser = { name };
  if (!name) {
    res.status(400).json({
      errorMessage: 'Please provide a name for the user.'
    });
  }
  db.insert(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({
        error: 'There was an error while saving the user to the database'
      });
    });
});

router.get('/', (req, res) => {
  db.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The user information could not be retrieved.' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.getById(id)
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The user information could not be retrieved.' });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const updatedInfo = { name };
  if (!name) {
    res.status(400).json({
      errorMessage: 'Please provide a name for the new user.'
    });
  }
  db.getById(id).then(name => {
    if (!name) {
      res
        .status(404)
        .json({ message: 'The user with the specified ID does not exist.' });
    }
    db.update(id, updatedInfo).then(updateName => {
      db.getById(id).then(newName => {
        res.status(201).json(newName);
      });
    });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.getById(id).then(user => {
    if (user) {
      db.remove(id).then(delId => {
        res.status(200).json(user);
      });
    } else {
      res
        .status(400)
        .json({ message: 'The user with the specified ID does not exist.' });
    }
  });
});

module.exports = router;
