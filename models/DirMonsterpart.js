const { Schema, model } = require("mongoose");

const schema = new Schema({
  dir: { type: String },
  img: [
    {
      url: { type: String },
      position: {
        x: { type: Number },
        y: { type: Number },
      },
      isChecked: { type: Boolean },
    },
  ],
});

module.exports = model("DirMonsterpart", schema);
