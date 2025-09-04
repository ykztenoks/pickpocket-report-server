import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "User hasn't provided all fields" })
    }

    const user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    })

    if (!user) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
      if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Provide a valid email address." })
        return
      }

      const passwordRegex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/
      if (!passwordRegex.test(password)) {
        res.status(400).json({
          message:
            "Password must have at least 6 characters and contain at least one number, one lowercase, one uppercase letter and a special character.",
        })
        return
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const created = await User.create({
        username,
        email,
        password: hashedPassword,
      })

      return res
        .status(201)
        .json({ message: "User created succesfuly", created })
    } else {
      return res
        .status(409)
        .json({ message: "Username or email already taken" })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

export { signup }
