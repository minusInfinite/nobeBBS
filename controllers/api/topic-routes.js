const router = require('express').Router();
const { Topic, Post, User} = require('../../models');
const {isAuth, isAdmin} = require('../middleware/auth');
const sequelize = require('../../config/connection');

// GET ALL TOPICS
router.get('/', (req, res) => {
    console.log('======================');
    Topic.findAll({
      // INCLUDE ALL POSTS THAT BELONG TO TOPIC
      attributes: ['id', 
                   'subject',
                   'created_at',
                  [sequelize.fn('COUNT', sequelize.col('posts.id')), 'postCount']
                ],
      include: [
          {
            model: Post,
            // INCLUDE ALL USERS THAT BELONG TO POST
            include: {
              model: User,
              attributes: ['username']
            },
          },
      ],
      order: [[Post, 'created_at', 'DESC']],
      group: ['Topic.id']
    }) 
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
  
});

// FIND ONE TOPIC BY ID
router.get('/:id', (req, res) => {
    Topic.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 
                   'subject',
                   'created_at'
                ],
      // INCLUDE ALL POSTS THAT BELONG TO TOPIC
      include: [
        {
          model: Post,
          // INCLUDE ALL USERS THAT BELONG TO POST
          include: {
            model: User,
            attributes: ['username']
          }
        },
    ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// CREATE A TOPIC, MUST BE LOGGED IN AS ADMIN
router.post('/', isAdmin, (req, res) => {
    Topic.create({ 
        subject: req.body.subject
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err); 
        });
});

// EDIT A TOPIC, MUST BE LOGGED IN AS ADMIN
router.put('/:id', isAdmin, (req, res) => {
    Topic.update({
        subject: req.body.subject
      },
      {
        where: {
          id: req.params.id
        }
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE TOPIC, MUST BE LOGGED IN AS ADMIN
router.delete('/:id', isAdmin, (req, res) => {
    Topic.destroy({
        where: {
            id: req.params.id 
        }
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;

