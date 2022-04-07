import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String },
  nickname: { type: String, default: null },
  image: { type: String },
  email: { type: String },
  stickers: [{ url: { type: String }, sender: { type: String } }],
});

export default model("User", userSchema, "users", { overwriteModels: true });
