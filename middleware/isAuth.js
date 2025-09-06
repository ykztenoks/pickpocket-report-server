import jwt from "jsonwebtoken"

export default function isAuth(req, res, next) {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "No token provided" })
    }

    const token = req.headers.authorization.split(" ")[1]

    if (!token) {
      return res.status(401).json({ message: "Token malfunction" })
    }

    const verified = jwt.verify(token, process.env.TOKEN_SECRET)

    req.payload = verified.payload

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}
