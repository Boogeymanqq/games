const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  teacher: [{ type: Types.ObjectId, ref: "Teacher" }],
  students: [{ type: Types.ObjectId, ref: "Student" }],
  frame: { type: Object[(width, height)] },
  monsterPart: [{ type: Types.ObjectId, ref: "MonsterPart" }],
});

module.exports = model("Monster", schema);
