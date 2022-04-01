import { Schema, model } from "mongoose";

const mailSchema = new Schema(
  {
    text: { type: String, required: true, minlength: 10 },
    authorId: { type: Schema.Types.ObjectId, ref: "User" },
    recipientId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    hasAReply: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model("Mail", mailSchema, "mails", { overwriteModels: true });
