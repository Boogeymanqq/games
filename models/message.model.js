// модель сообщения для `Mongoose`

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const messageSchema = new Schema(
  {
    // идентификатор сообщения
    messageId: {
      type: String,
      required: true,
      unique: true,
    },
    // тип сообщения
    messageType: {
      type: String,
      required: true,
    },
    // координаты предмета
    coordinates: {
      type: Object,
      required: true,
    },
    // идентификатор комнаты
    roomId: {
      type: String,
      required: true,
    },
    // идентификатор пользователя
    userId: {
      type: String,
      required: true,
    },
    // имя пользователя
    userName: {
      type: String,
      required: true,
    },
    //
    subjectId: {
      type: String,
      required: true,
    },
    subjectArr: {
      type: Object,
      required: true,
    },
  },
  // createAt, updateAt - дата и время создания и обновления сообщения
  {
    timestamps: true,
  }
);

export default model("Message", messageSchema);
