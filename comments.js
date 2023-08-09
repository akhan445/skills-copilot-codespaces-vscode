// Create web server

// Import modules
const express = require('express');
const router = express.Router();
const db = require('../models');
const { Comment } = db;

// Create comment
router.post('/comments', (req, res) => {
  const comment = req.body;
  Comment.create(comment)
    .then((comment) => {
      res.status(201).json(comment);
    })
    .catch((err) => {
      res.status(400).json({ message: 'Please check your comment' });
    });
});

// Get all comments
router.get('/comments', (req, res) => {
  Comment.findAll()
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((err) => {
      res.status(400).json({ message: 'Please check your comment' });
    });
});

// Get comment by ID
router.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  Comment.findByPk(id)
    .then((comment) => {
      if (!comment) {
        res.status(404).json({ message: 'Comment not found' });
      } else {
        res.status(200).json(comment);
      }
    })
    .catch((err) => {
      res.status(400).json({ message: 'Please check your comment' });
    });
});

// Update comment
router.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const updatedComment = req.body;
  Comment.findByPk(id)
    .then((comment) => {
      if (!comment) {
        res.status(404).json({ message: 'Comment not found' });
      } else {
        return comment.update(updatedComment);
      }
    })
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((err) => {
      res.status(400).json({ message: 'Please check your comment' });
    });
});

// Delete comment
router.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  Comment.findByPk(id)
    .then((comment) => {
      if (!comment) {
        res.status(404).json({ message: 'Comment not found' });
      } else {
        return comment.destroy();
      }
    })
    .then(() => {
      res
    })
    .catch((err) => {
      res.status(400).json({ message: 'Please check your comment' });
    });
});