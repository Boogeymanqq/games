const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  game: { type: String },
  components: [{ type: Types.ObjectId, ref: "MonsterPart" }],
  teacher: { type: Types.ObjectId, ref: "Teacher" }
})

module.exports = model("GameTemplate", schema);