// model
const Student = require('../../models/Student/Student')
const Father = require('../../models/Student/Father')
const Mother = require('../../models/Student/Mother')
const Tutor = require('../../models/Student/Tutor')

// utils
const handleErrors = require('../../Utils/Errors/handleErrors')

module.exports.index = async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json(students)

  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

module.exports.store = async (req, res) => {
  try {
    const student = await Student.create(req.body)

    res.status(200).json({student: student._id})
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  } 
}

module.exports.show = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id);

    res.status(200).json(student)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

module.exports.update = async (req, res) => {
  const { id:_id } = req.params;

  try {
    const student = await Student.updateOne({ _id }, req.body) 

    res.status(200).json(student)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

module.exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id) 
    await student.remove()

    res.status(200).json({student: student._id})
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

// ----
module.exports.show_father = async (req, res) => {
  const { id: student } = req.params;

  try {
    const father = await Father.findOne({student}); 

    res.status(200).json(father)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

module.exports.update_father = async (req, res) => {
  const { id: student } = req.params;

  try {
    const father = await Father.findOneAndUpdate({student}, req.body) 

    res.status(200).json(father)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

// ----
module.exports.show_mother = async (req, res) => {
  const { id: student } = req.params;

  try {
    const mother = await Mother.findOne({student}); 

    res.status(200).json(mother)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

module.exports.update_mother = async (req, res) => {
  const { id: student } = req.params;

  try {
    const mother = await Mother.findOneAndUpdate({student}, req.body) 

    res.status(200).json(mother)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

// ----
module.exports.show_tutor = async (req, res) => {
  const { id: student } = req.params;

  try {
    const tutor = await Tutor.findOne({student}); 

    res.status(200).json(tutor)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

module.exports.update_tutor = async (req, res) => {
  const { id: student } = req.params;

  try {
    const tutor = await Tutor.findOneAndUpdate({student}, req.body) 

    res.status(200).json(tutor)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}