customersQueries = require('./customersQueries');
usersQueries = require('./usersQueries');

module.exports = { //this is not the best solution, can generate duplicate functions or duplicate parameters
        ...customersQueries,
        ...usersQueries
}