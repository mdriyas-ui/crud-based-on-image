const imageRouter = require('express').Router();
const image = require('../controller/image.business_logic')
const multer = require('multer');
const mongoose = require("mongoose");
const Image = mongoose.model('Image');
let path = require('path');
const fs = require('fs');



const storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, './uploads/')
    },
    filename: (req, file, callback) => {
        callback(null, new Date().toISOString() + file.originalname)
    }
});
const upload = multer({
    storage: storage
});


//rest api's
imageRouter.get('/', (req, res) => {
    res.send("WELCOME TO EMPLOYMENT PORTAL")
});


imageRouter.get('/view-image/:_id', image.viewImage);



imageRouter.delete('/delete-image/:_id', image.deleteImage);



imageRouter.post('/upload-image', upload.single('empImage'), async (req, res) => {
    let imageFile = req.file;
    const imageData = new Image({
        imageName: imageFile.filename,
        imageUrl: imageFile.path
    });
    let savedImgData = await imageData.save()
    console.log(`IMAGE UPLOAD SUCCESSFULLY : ${savedImgData}`);
    res.send(`IMAGE UPLOAD SUCCESSFULLY : ${JSON.stringify(req.file)}`);
});



imageRouter.post('/update-image/:_id', upload.single('empImage'), async (req, res) => {
    //FETCH image data for remove file from local uploads
    let fetchImage = await Image.find({
        _id: req.params._id
    });
    let imagePath = fetchImage[0].imageUrl
    fs.unlinkSync(imagePath) // file removed

    //update image path in mango
    let imageFile = req.file;
    let updatedImage = await Image.updateOne({
        _id: req.params._id
    }, {
        imageUrl: imageFile.path
    });

    //condition for updated query
    if (updatedImage.acknowledged === true && updatedImage.modifiedCount > 0) {

        //fetch updated image and show response
        let newImage = await Image.find({
            _id: req.params._id
        });
        let imageUrl = newImage[0].imageUrl;
        let imagePath = path.join(__dirname, `${'../' + imageUrl}`);
        console.log(imagePath);
        res.sendFile(imagePath)

    } else {
        res.status(204).send(`the data could not be created or modified with the record`);
        console.log("the data could not be created or modified with the record");
    }

});


module.exports = imageRouter;