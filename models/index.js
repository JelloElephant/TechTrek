const User = require('./User');

module.exports = { User };

Trips.belongsTo(User, {
    foreignKey: 'user_id'
})