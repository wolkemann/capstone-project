import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String },
  image: { type: String },
  email: { type: String },
  /* authorId: { type: Schema.Types.ObjectId, ref: "User" },
    recipientId: { type: Schema.Types.ObjectId, ref: "User" }, */
});

export default model("User", userSchema, "users", { overwriteModels: true });
