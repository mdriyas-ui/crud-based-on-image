const joi = require('@hapi/joi');
const { string } = require('joi');

const empSchema = joi.object({
        empName : joi.string().required(),
        empEmail:joi.string().email().lowercase().required(),
        designation:joi.string().required(),
        address:joi.string().required(),
})

module.exports={
     empSchema
}