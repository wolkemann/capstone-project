import { Schema, model } from "mongoose";

const mailSchema = new Schema(
  {
    text: { type: String, required: true, minlength: 10 },
    authorId: { type: Schema.Types.ObjectId, ref: "User" },
    recipientId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    mailRepliedId: { type: Schema.Types.ObjectId, ref: "Mail", default: null },
    reactionEmoji: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model("Reply", mailSchema, "replies", { overwriteModels: true });
