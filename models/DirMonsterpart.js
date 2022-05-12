const { Schema, model } = require("mongoose");

const schema = new Schema({
  url: [{ type: Object }],
  position: {
    x: { type: Number },
    y: { type: Number },
  },
  isChecked: { type: Boolean },
});

module.exports = model("DirMonsterpart", schema);
