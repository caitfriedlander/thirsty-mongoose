var Bar = require('../models/bar');
var Beer = require('../models/beer');

module.exports = {
    index,
    new: newBar,
    create,
    show,
    delete: destroy,
    newServing,
    createServing,
    deleteServing
}

// Index
function index(req, res, next) {
    var bars = Bar.find({}, function(err, bars) {
        if (err) return next(err);
        res.render('bars/index', { bars });
    });
}

// New
function newBar(req, res, next) {
    res.render('bars/new');
}

// Create
function create(req, res, next) {
    var body = req.body;

    var bar = new Bar(body);
    bar.save(function(err) {
        if (err) return res.render('bars/new');
        console.log(bar);
        res.redirect('/bars');
    });
}

// Show
function show(req, res, next) {
    Bar.findById(req.params.id).populate('beers').exec(function(err, bar) {
        if (err) return res.render('bars/index');
        res.render('bars/show', {bar});
    });
}

// Delete
function destroy(req, res, next) {
    Bar.findById(req.params.id, function(err, bar) {
        bar.remove();
        res.redirect('/bars');
    });
}

// New Serving
function newServing(req, res) {
    Beer.find({}).where('bars').nin([req.params.id]).populate('bars')
    .exec(function(err, beers) {
        var bar = beers[0].bars[0];
        res.render('bars/serve', {
            beers,
            bar,
            barId: req.params.id
        });
    });
}

// Start Serving Beer
function createServing(req, res, next) {
    Bar.findById(req.params.barId, (err, bar) => {
        bar.beers.push(req.params.beerId);
        bar.save(() => {
            Beer.findById(req.params.beerId, (err, beer) => {
                beer.bars.push(req.params.barId);
                beer.save(() => {
                    res.redirect(`/bars/${bar.id}`);
                });
            });
        });
    });
}

// Stop Serving Beer
function deleteServing(req, res) {
    Bar.findById(req.params.barId, (err, bar) => {
        bar.beers.remove(req.params.beerId);
        bar.save(() => {
            Beer.findById(req.params.beerId, (err, beer) => {
                beer.bars.remove(req.params.barId);
                beer.save(() => {
                    res.redirect(`/bars/${bar.id}`);
                });
            });
        });
    })
}