import { Schema, model } from "mongoose";

const mailSchema = new Schema(
  {
    text: { type: String, required: true, minlength: 10 },
    authorId: { type: Schema.Types.ObjectId, ref: "User" },
    recipientId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    reply_to_mail: { type: Schema.Types.ObjectId, ref: "Mail", default: null },
    reactionEmonji: { type: String },
  },
  { timestamps: true }
);

export default model("Reply", mailSchema, "replies", { overwriteModels: true });
