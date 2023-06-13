const User = require('./User');

module.exports = { User };

// connecting trips and user by their foreign key
Trips.belongsTo(User, {
    foreignKey: 'user_id'
})