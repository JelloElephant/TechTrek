const User = require('./User');
const Trips = require('./trips');

module.exports = { User, Trips };

// connecting trips to user with their foreign key.
Trips.belongsTo(User, {
    foreignKey: 'user_id'
})