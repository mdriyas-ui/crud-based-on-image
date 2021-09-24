const mongoose = require("mongoose");
const schemaValidation = require('../helper/validate_schema');
const Image = mongoose.model('Image');
const fs = require('fs');
require('dotenv').config();
let path = require('path');



exports.viewImage = async (req, res) => {

    let fetchImage = await Image.find({
        _id: req.params._id
    });
    let imageUrl = fetchImage[0].imageUrl;
    let imagePath = path.join(__dirname, `${'../' + imageUrl}`);
    console.log(`View image function (path) : ${imagePath}`);
    res.sendFile(imagePath)

}



exports.deleteImage = async (req, res) => {

    let fetchImage = await Image.find({
        _id: req.params._id
    });
    let imagePath = fetchImage[0].imageUrl
    try {
        fs.unlinkSync(imagePath)    // file removed
        let deletedImgData = await Image.deleteOne({
            _id: req.params._id
        });
        if (deletedImgData.deletedCount === 0) {
            res.status(404).send(`already deleted (or) not found in record`);
            console.log("already deleted or not found in record");
        } else {
            console.log("image deleted successFully");
            res.status(200).send(`employee image deleted successfully`);            
        }

    } catch (err) {
        console.error(err)
    }
}
