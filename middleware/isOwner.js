import Comment from "../models/comment.model.js"
import Report from "../models/report.model.js"

export default async function isOwner(req, res, next) {
  try {
    const { id, reportId } = req.params

    //CHECKS FOR COMMENT OWNER
    if (reportId) {
      const comment = await Comment.findById(id)

      if (String(comment.commenter) !== req.payload._id) {
        return res.status(401).json({
          message: "Unauthorized, you are not the owner of this comment.",
        })
      }
      next()
    } else {
      //CHECKS FOR REPORT OWNER
      const report = await Report.findById(id)

      if (String(report.reporter) !== req.payload._id) {
        return res.status(401).json({
          message: "Unauthorized, you are not the owner of this report.",
        })
      }
      next()
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}
