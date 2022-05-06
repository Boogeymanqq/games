const { Schema, model } = require("mongoose");

const schema = new Schema({
  url: { type: String },
  position: {
    x: { type: Number },
    y: { type: Number },
  },
  isChecked: { type: Boolean },
});

module.exports = model("MonsterPart", schema);
