var Beer = require('../models/beer');
module.exports = {
   index,
   new: newBeer,
   create,
   show,
   delete: destroy,
   createComment 
}

// Index
function index(req, res, next) {
    var beers = Beer.find({}, function(err, beers) {
        if (err) return next(err);
        res.render('beers/index', { beers });
    });
}

// New
function newBeer(req, res, next) {
    res.render('beers/new');
};

// Create
function create(req, res, next) {
    var body = req.body;

    var beer = new Beer(body);
    beer.save(function(err) {
        if (err) return res.render('beers/new');
        console.log(beer);
        res.redirect('/beers')
    });
}

// Show
function show(req, res, next) {
    Beer.findById(req.params.id).populate('bars').exec(function(err, beer) {
        if (err) return res.render('beers/index');
        res.render('beers/show', {beer});
    });
}

// Delete
function destroy(req, res, next) {
    Beer.findById(req.params.id, function(err, beer){
        beer.remove();
        res.redirect('/beers');
    });
}

// Comment

function createComment(req, res, next) {
    Beer.findById(req.params.id).exec((err, beer) => {
        beer.comments.push({content: req.body.content});
        beer.save(err => {
            console.log(beer.id);
            res.redirect(`/beers/${beer.id}`);
        });
    });
}