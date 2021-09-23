const mongoose = require('mongoose')

const imageModel = mongoose.Schema({
    imageName : {
        type : String
    },
    imageUrl:{
        type : String
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Image',imageModel);





