const db = require('../../database/index');

const User = db.Model.extend({
  tableName: 'app_user',
  hasSecurePassword: true,
});

module.exports = User;
