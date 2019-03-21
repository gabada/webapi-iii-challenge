const express = require('express');
const db = require('../data/helpers/userDb.js');

const router = express.Router();

function capitalize(req, res, next) {
  if (req.body.name) {
    req.body.name = req.body.name.toUpperCase();
    next();
  } else {
    res.status(400).json({ message: 'Please supply a name' });
  }
}

router.post('/', capitalize, (req, res) => {
  db.insert(req.body)
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

router.get('/userpost/:id', (req, res) => {
  const { id } = req.params;
  db.getUserPosts(id)
    .then(posts => {
      if (posts.length > 0) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: 'No posts found for that user!' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The posts could not be retrieved' });
    });
});

router.put('/:id', capitalize, (req, res) => {
  const { id } = req.params;
  const updatedInfo = req.body;
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
