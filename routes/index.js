var express = require('express');
var router = express.Router(),
    path = require('path'),
    models = require('../models/'),
    https = require('https'),
    async = require('async'),
    mongoose = require('mongoose');

var getDelMems = function(which, arr) {
    var subkids = [],
        nameStr = '';
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].parent == which) {
            console.log(arr[i], 'is a subgroup of', which);
            nameStr += arr[i].name + '-';
            subkids.push(arr[i].name);
        }
    }
    for (var j = 0; j < subkids.length; j++) {
        nameStr += getDelMems(subkids[j], arr)
    }
    return nameStr;
};
var getTree = function(which, arr) {
    var subkids = [],
        nameObj = {};
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].parent == which) {
            console.log(arr[i], 'is a subgroup of', which);
            nameObj[arr[i].name] = {};
            subkids.push(arr[i].name);
        }
    }
    for (var j = 0; j < subkids.length; j++) {
        nameObj[subkids[j]]= getTree(subkids[j], arr)
    }
    return nameObj;
}
router.get('/', function(req, res, next) {
    res.send('api live')
});
String.prototype.initCap = function() {
    return this.slice(0, 1).toUpperCase() + this.slice(1);
};
router.post('/newTaxon/', function(req, res, next) {
    console.log('tryin to save', req.body)
    if (!req.body.name || !req.body.desc || !req.body.parent || !req.body.synaps || !req.body.synaps.length) {
        res.send('Error: cannot save new taxa (missing parameters!).')
    } else {
        //all data present
        mongoose.model('Taxa').find({ name: req.body.name }, function(err, oldTx) {
            if (oldTx.length) {
                res.send('Error: This taxon already exists!');
            } else {
                var newTax = mongoose.model('Taxa')();
                newTax.name = req.body.name.initCap();
                newTax.desc = req.body.desc;
                newTax.parent = req.body.parent;
                newTax.synaps = req.body.synaps;
                newTax.save();
                res.send('Saved ' + req.name + '!');
            }
        })
    }
});
router.get('/remove/:taxon', function(req, res, next) {
    //remove a taxon and all its children.
    mongoose.model('Taxa').find({}, function(err, allTxs) {
        rems = getDelMems(req.params.taxon, allTxs).split('-');
        mongoose.model('Taxa').find({ name: req.params.taxon }).remove().exec();
        for (var i = 0; i < rems.length; i++) {
            mongoose.model('Taxa').find({ name: rems[i] }).remove().exec();
        }
        res.send('Removed ' + rems.toString())
    })
})
router.get('/new', function(req, res, next) {
    res.sendFile('./index.html', { root: './views' })
})

router.get('/allTax', function(req, res, next) {
    mongoose.model('Taxa').find({}, function(err, data) {
        console.log('sending all taxa to front', err, data)
        res.send(data)
    })
})

router.get('/tree', function(req, res, next) {
    mongoose.model('Taxa').find({}, function(err, allTxs) {
        var tObj = getTree('Biota', allTxs);
        res.send(JSON.stringify(tObj));
    })
})

router.get('/tree/:tax', function(req, res, next) {
    mongoose.model('Taxa').find({}, function(err, allTxs) {
        var tObj = getTree(req.params.tax.initCap(), allTxs);
        res.send(JSON.stringify(tObj));
    })
})

router.get('/info/:tax',function(req,res,next){
	mongoose.model('Taxa').find({name:req.params.tax.initCap()},function(err,tx){
		if (err) res.send(err);
		res.send(tx);
	})
})

module.exports = router;
