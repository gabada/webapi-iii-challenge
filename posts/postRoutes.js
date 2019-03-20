const express = require('express');
const db = require('../data/helpers/postDb.js');

const router = express.Router();

router.post('/', (req, res) => {
  const { text, user_id } = req.body;
  const newPost = { text, user_id };
  if (!text && !user_id) {
    res.status(400).json({
      errorMessage: 'Please provide text and user_id for the post.'
    });
  }
  db.insert(newPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({
        error: 'There was an error while saving the post to the database'
      });
    });
});

router.get('/', (req, res) => {
  db.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.getById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { text, user_id } = req.body;
  const updatedInfo = { text, user_id };
  if (!text && !user_id) {
    res.status(400).json({
      errorMessage: 'Please provide text and user_id for the post.'
    });
  }
  db.getById(id).then(post => {
    if (!post) {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
    db.update(id, updatedInfo).then(updatePost => {
      db.getById(id).then(newPost => {
        res.status(201).json(newPost);
      });
    });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.getById(id).then(post => {
    if (post) {
      db.remove(id).then(delId => {
        res.status(200).json(post);
      });
    } else {
      res
        .status(400)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  });
});

module.exports = router;
