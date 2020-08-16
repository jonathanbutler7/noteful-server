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
};

module.exports = FolderService;
