const FolderService = {
  getAllFolders(knex) {
    return knex.select("*").from("folder");
  },
  insertFolder(knex, newFolder) {
    return knex
      .insert(newFolder)
      .into("folder")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  getById(knex, id) {
    return knex.from("folder").where("id", id).first();
  },
  deleteFolder(knex, id) {
    return knex("folder").where({ id }).delete();
  },
};

module.exports = FolderService;
