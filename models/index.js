const User = require('./User');
const Trips = require('./trips');
const Results = require('./results');

module.exports = { User, Trips, Results };

// connecting trips to user with their foreign key.
Trips.belongsTo(User, {
    foreignKey: 'user_id'
})