import { Schema, model } from "mongoose"

const commentSchema = new Schema(
  {
    comment: { type: String, required: true, trim: true, maxLength: 124 },
    commenter: { type: Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
)

export default model("Comment", commentSchema)
