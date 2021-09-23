const mongoose = require("mongoose");
const Employee = mongoose.model('Employee');
const schemaValidation = require('../helper/validate_schema');
const fs = require('fs');
const Image = mongoose.model('Image');



exports.create = async (req, res, next) => {
    try {
        let employee = {
            empName: req.body.empName,
            empEmail: req.body.empEmail,
            designation: req.body.designation,
            address: req.body.address,
        }
        let validationResult = await schemaValidation.empSchema.validateAsync(employee)
        let empData = new Employee(validationResult);
        let savedEmpData = await empData.save()
        console.log(savedEmpData);
        res.status(200).send(`the given employees details is successfully created : ${savedEmpData}`);

    } catch (error) {
        if (error.isjoi === true) error.status = 422
        next(error);
    }
};



exports.read = async (req, res) => {
    let empData = await Employee.find()
    res.status(200).send(`employee data: ${empData}`);
};



exports.update = async (req, res, next) => {

    try {
        const employee = {
            empName: req.body.empName,
            empEmail: req.body.empEmail,
            designation: req.body.designation,
            address: req.body.address,
        }
        let validationResult = await schemaValidation.empSchema.validateAsync(employee)
        let empData = new Employee(validationResult);
        let updatedEmpData = await Employee.updateOne({
            _id: req.params._id
        }, {
            empName: empData.empName,
            empEmail: empData.empEmail,
            designation: empData.designation,
            address: empData.address,
        });
        // console.log(updatedEmpData);
        if (updatedEmpData.acknowledged === true && updatedEmpData.modifiedCount > 0) {
            let updatedData = await Employee.find({
                _id: req.params._id
            });
            res.status(200).send(`this data updated successfully: ${updatedData}`);
            console.log("successfully updated");

        } else {
            res.status(204).send(`the data could not be created or modified with the record`);
            console.log("the data could not be created or modified with the record");
        }
    } catch (error) {
        if (error.isjoi === true) error.status = 422
        next(error);
    }
}


exports.delete = async (req, res) => {
    let deletedEmpData = await Employee.deleteOne({
        _id: req.params._id
    });

    if (deletedEmpData.deletedCount === 0) {
        res.status(404).send(`already deleted (or) not found in record`);
        console.log("already deleted or not found in record");
    } else {
        res.status(200).send(`employee data deleted successfully`);
    }

};



exports.deleteImage =async (req, res)=>{

    let fetchImage = await Image.find({_id: req.params._id});
    // console.log(fetchImage[0].imageUrl);   

    const path = fetchImage[0].imageUrl
    try {
      fs.unlinkSync(path)
      //file removed 
      let deletedImgData = await Image.deleteOne({
        _id: req.params._id
    });
    if (deletedImgData.deletedCount === 0) {
        res.status(404).send(`already deleted (or) not found in record`);
        console.log("already deleted or not found in record");
    } else {
        res.status(200).send(`employee image deleted successfully`);
    }

    } catch(err) {
      console.error(err)
    }
}