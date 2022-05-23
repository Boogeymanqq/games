const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  groupName: { type: String },
  students: [{ type: Types.ObjectId, ref: "Student" }],
  teacher: { type: Types.ObjectId, ref: "Teacher" },
});

module.exports = model("StudentsGroup", schema);
