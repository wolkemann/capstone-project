import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, minlength: 10 },
  password: { type: String, required: true, minlength: 8 },
  nickname: { type: String, required: true, minlength: 8 },
  /* authorId: { type: Schema.Types.ObjectId, ref: "User" },
    recipientId: { type: Schema.Types.ObjectId, ref: "User" }, */
});

export default model("User", userSchema, "users", { overwriteModels: true });
