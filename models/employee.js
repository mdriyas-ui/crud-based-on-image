const mongoose = require('mongoose')

const employeeModel = mongoose.Schema({
    empName : {
        type : String
    },
    empEmail:{
        type : String
    },
    designation :{
        type: String
    },
    address:{
        type: String
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Employee',employeeModel);





