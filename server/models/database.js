const mongoose = require('mongoose');
mongoose.connect(process.env.mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
    console.log('Connected')
});

require('./Category')
require('./information')