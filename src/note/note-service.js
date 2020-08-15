const NoteService = {
    getAllNotes(knex) {
        return knex.select('*').from ('note')
    }
}

module.exports = NoteService;