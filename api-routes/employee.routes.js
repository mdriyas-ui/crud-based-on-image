const employeeRouter = require('express').Router();
const Employee = require('../controller/employee.business_logic')
const multer = require('multer');
const mongoose = require("mongoose");
const Image = mongoose.model('Image');



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
employeeRouter.get('/', (req, res) => {
    res.send("WELCOME TO EMPLOYMENT PORTAL")
});

employeeRouter.post('/upload-image', upload.single('empImage'), async (req, res) => {
    let imageFile = req.file;
    const imageData = new Image({
        imageName: imageFile.filename,
        imageUrl: imageFile.path
    });
    let savedImgData = await imageData.save()
    console.log(savedImgData);
    res.send(req.file);
});


employeeRouter.get('/view-image/:_id', Employee.viewImage);


employeeRouter.delete('/delete-image/:_id', Employee.deleteImage);

module.exports = employeeRouter;