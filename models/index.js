var mongoose = require('mongoose'),
    http = require('https'),
    kid = require('child_process'),
    ps = require('ps-node');
    require('./taxa');
if (!process.env.NODE_ENV || process.env.NODE_ENV != 'prod') {
    //just some quick env check. If we're developing locally, go ahead and use our local db. Otherwise, use the mlab db.
    //check to see if db running on local
    if (process.platform == 'win32' && process.env.USERNAME == 'Newms') {
        ps.lookup({ command: 'mongod' }, function(e, f) {
        	console.log('e,f',e,f)
            if (!f.length && false) {
                //database not already running, so start it up!
                // c: && cd c:\mongodb\bin && start mongod -dbpath "d:\data\mongo\db" && pause
                kid.exec('c: && cd c:\\mongodb\\bin && start mongod -dbpath "d:\\data\\mongo\\db" && pause', function(err, stdout, stderr) {
                    if (err) {
                        console.log('Uh oh! An error of "', err, '" prevented the DB from starting!');
                    }else{
                    	mongoose.connect('mongodb://localhost:27017/taxo');
                    }
                })
            } else {
                console.log('mongod running!')
                mongoose.connect('mongodb://localhost:27017/taxo');
            }
        })
    }
} else {
    mongoose.connect(process.env.MONGODB_URI);
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(e) {
    console.log('Database connected!')
})
