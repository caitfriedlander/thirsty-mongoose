var express = require('express');
var router = express.Router();
var barsCtrl = require('../controllers/bars');

// ROUTES
router.get('/', barsCtrl.index);
router.get('/new', barsCtrl.new);
router.post('/', barsCtrl.create);
router.get('/:id', barsCtrl.show);
router.delete('/:id', barsCtrl.delete);
router.get('/:id/beers/new', barsCtrl.newServing)
router.post('/:barId/beers/:beerId', barsCtrl.createServing)
router.delete('/:barId/beers/:beerId', barsCtrl.deleteServing)

module.exports = router;
