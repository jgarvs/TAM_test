const userModel = require('../../models/user');
const userService = require('./userService');

module.exports = userService(userModel);