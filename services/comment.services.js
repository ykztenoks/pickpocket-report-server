import Comment from "../models/comment.model.js"
import User from "../models/user.model.js"
import Report from "../models/report.model.js"

const create = async (req, res) => {
  try {
    const { reportId } = req.params

    const created = await Comment.create({
      comment: req.body.comment,
      commenter: req.payload._id,
    })

    await Report.findByIdAndUpdate(reportId, {
      $push: { comments: created._id },
    })

    return res.status(201).json(created)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

const like = async (req, res) => {
  try {
    const { id } = req.params

    const comment = await Comment.findById(id)
    if (comment.likes.includes(req.payload._id)) {
      await Comment.findByIdAndUpdate(id, {
        $pull: { likes: req.payload._id },
      })

      return res.status(200).json({ message: "comment unliked succesfuly" })
    } else {
      await Comment.findByIdAndUpdate(id, {
        $push: { likes: req.payload._id },
      })
      return res.status(200).json({ message: "comment liked succesfuly" })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

const remove = async (req, res) => {
  try {
    const { id, reportId } = req.params
    await Report.findByIdAndUpdate(reportId, { $pull: { comments: id } })
    await Comment.findByIdAndDelete(id)

    return res.status(204).json({ message: "Comment deleted succesfuly" })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

export { create, like, remove }
