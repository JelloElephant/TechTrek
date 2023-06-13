const User = require('./User');

module.exports = { User };

// connecting trips to user with their foreign key
Trips.belongsTo(User, {
    foreignKey: 'user_id'
})