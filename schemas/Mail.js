import { Schema, model } from "mongoose";
import "./User";

const mailSchema = new Schema(
  {
    text: { type: String, required: true, minlength: 10 },
    authorId: { type: Schema.Types.ObjectId, ref: "User" },
    recipientId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default model("Mail", mailSchema, "mail", { overwriteModels: true });
