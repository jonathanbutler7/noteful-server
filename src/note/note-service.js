const NoteService = {
  getAllNotes(knex) {
    return knex.select("*").from("note");
  },
  insertNote(knex, newNote) {
    return knex
      .insert(newNote)
      .into("note")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  getById(knex, id) {
      return knex.from("note").where("id", id).first();
  }
};

module.exports = NoteService;
