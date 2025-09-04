import { Schema, model } from "mongoose"

const reportSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 10,
      maxLength: 50,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minLength: 20,
      maxLength: 250,
    },
    reporter: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    location: { type: String, required: true, trim: true },
    pickpocketProfile: [{ type: String }],
  },
  {
    timestamps: true,
  }
)

export default model("Report", reportSchema)
