import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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

const login = async (req, res) => {
  try {
    const { loginInfo, password } = req.body

    if (!loginInfo || !password) {
      return res.status(400).json({ message: "Provide all fields" })
    }

    const user = await User.findOne({
      $or: [{ email: loginInfo }, { username: loginInfo }],
    })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const passwordCheck = await bcrypt.compare(password, user.password)

    if (!passwordCheck) {
      return res.status(401).json({ message: "Wrong password" })
    }

    delete user._doc.password

    const token = jwt.sign({ payload: user }, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "24h",
    })

    return res.status(200).json({ message: "Logged in", authToken: token })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

const verify = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ message: "All good, verified", payload: req.payload })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

export { signup, login, verify }
