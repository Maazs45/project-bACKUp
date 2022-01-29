const mongoose = require('mongoose');

const informationSchema = new mongoose.Schema({
     name:{
         type: String,
         required: 'This field is required'
     },
     description:{
        type: String,
        required: 'This field is required'
    },
    releaseyear:{
        type: String,
        required: 'This field is required'
    },
    review:{
        type: String,
        required: 'This field is required'
    },
    category:{
        type: String,
        enum:['shooting', 'racing', 'simulation', 'darkfantasy', 'pointandclick', 'nocategory'],
        required: 'This field is required'
    },
    image:{
        type:String,
        required: 'This field is required'
    }


});
informationSchema.index({name: 'text', description: 'text'});





module.exports = mongoose.model('Information', informationSchema)