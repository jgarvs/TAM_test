customersMutation = require('./customersMutations');
signMutation = require('./signMutations');
usersMutation = require('./usersMutations');

module.exports = { //this is not the best solution, can generate duplicate functions or duplicate parameters
        ...customersMutation,
        ...signMutation,
        ...usersMutation
}