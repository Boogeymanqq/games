import mongoose from "mongoose";
const { Schema, model } = mongoose;

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
      size: { type: String },
    },
  ],
});

export default model("DirMonsterpart", schema);
