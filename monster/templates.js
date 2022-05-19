const GameTemplate = require("../models/GameTemplate");

module.exports = Templates = () => {
  const addTemplate = async ({ teacher, components }) =>
    new GameTemplate({
      game: "Monster",
      components,
      teacher,
    });
};
