var express = require('express');
var router = express.Router();
var beersCtrl = require('../controllers/beers');

// ROUTES
router.get('/', beersCtrl.index);
router.get('/new', beersCtrl.new);
router.post('/', beersCtrl.create);
router.get('/:id', beersCtrl.show);
router.delete('/:id', beersCtrl.delete);
router.post('/:id/comments', beersCtrl.createComment);


module.exports = router;
