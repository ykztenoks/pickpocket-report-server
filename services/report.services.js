import Report from "../models/report.model.js"
import User from "../models/user.model.js"

const getAll = async (req, res) => {
  try {
    const reports = await Report.find()
    return res.status(200).json(reports)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

const getById = async (req, res) => {
  try {
    const { id } = req.params

    const report = await Report.findById(id)

    return res.status(200).json(report)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

const create = async (req, res) => {
  try {
    const { title, description, location, pickpocketProfile } = req.body

    const created = await Report.create({
      title,
      description,
      location,
      pickpocketProfile: pickpocketProfile.split(",").map((s) => s.trim()),
      reporter: req.payload._id,
    })

    await User.findByIdAndUpdate(req.payload._id, {
      $push: { reports: created._id },
    })

    return res.status(201).json(created)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params

    const { title, description, location, pickpocketProfile } = req.body
    const toUpdate = { title, description, location, pickpocketProfile }

    for (let key in toUpdate) {
      if (toUpdate[key] === "undefined") {
        delete toUpdate[key]
      }
    }

    const updated = await Report.findByIdAndUpdate(id, toUpdate, {
      new: true,
      runValidators: true,
    })

    return res.status(200).json(updated)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

const remove = async (req, res) => {
  try {
    const { id } = req.params

    await User.findByIdAndUpdate(req.payload._id, { $pull: { reports: id } })
    await Report.findByIdAndDelete(id)
    return res.status(204).json({ message: "Deleted succesfuly" })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

export { getAll, getById, create, update, remove }
