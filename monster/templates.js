const GameTemplate = require("../models/GameTemplate");

export default Templates = () => {
  const addTemplate = async ({ teacher, components }) =>
    new GameTemplate({
      game: "Monster",
      components,
      teacher,
    });
};
