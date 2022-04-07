import { Schema, model } from "mongoose";

const EmojiCollectionSchema = new Schema({ url: { type: String } });

const userSchema = new Schema({
  name: { type: String },
  nickname: { type: String, default: null },
  image: { type: String },
  email: { type: String },
  emojis: [{ type: String, default: null }],
});

export default model("User", userSchema, "users", { overwriteModels: true });
