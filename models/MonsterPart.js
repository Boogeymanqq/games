const { Schema, model } = require("mongoose");

const schema = new Schema({
  src: { type: String },
  x: { type: String },
  y: { type: String },
});

module.exports = model("MonsterPart", schema);
