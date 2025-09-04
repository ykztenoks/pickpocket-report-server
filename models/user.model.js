import { Schema, model } from "mongoose"

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLenght: 32,
      unique: true,
    },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    profilePic: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    reports: [{ type: Schema.Types.ObjectId, ref: "Report" }],
  },
  {
    timestamps: true,
  }
)

export default model("User", userSchema)
