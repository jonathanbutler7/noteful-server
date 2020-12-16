const LoginService = {
//   getAllUsers(knex) {
//     return knex.select('*').from('user');
//   },
  insertUser(knex, newUser) {
    return knex
      .insert(newUser)
      .into('user')
      .returning('*')
      .then((rows) => {
        return rows[0];
      });
  },
  getById(knex, id) {
    return knex.from('user').where('id', id).first();
  },
  //   deleteUser(knex, id) {
  //     return knex('user').where({ id }).delete();
  //   },
  //   updateUser(knex, id, newUserFields) {
  //     return knex('user').where({ id }).update(newUserFields);
  //   },
};

module.exports = LoginService;
