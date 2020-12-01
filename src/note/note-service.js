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
  },
  deleteNote(knex, id) {
    console.log('id from service',id)
      return (knex("note").where({ id }).delete());
  },
  updateNote(knex, id, newNoteFields) {
      return knex("note").where({ id }).update(newNoteFields)
  }
};

module.exports = NoteService;
