// mentorController.js
const Mentor = require('../models/Mentor');
const Student = require('../models/Student');


const createMentor = async (req, res) => {
  try {
    const mentor = await Mentor.create(req.body);
    res.status(201).json(mentor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getStudentsForMentor = async (req, res) => {
  try {
    const mentorId = req.params.mentorId;
    const mentor = await Mentor.findById(mentorId).populate('students');
    res.status(200).json(mentor.students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMentors = async (req, res) => {
    try {
      const mentors = await Mentor.find();
      res.status(200).json(mentors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  const addStudentsToMentor = async (req, res) => {
    try {
      const mentorId = req.params.mentorId;
      const studentIds = req.body.studentIds;
  
      // Update the mentor with the new students
      const mentor = await Mentor.findByIdAndUpdate(
        mentorId,
        { $push: { students: { $each: studentIds } } },
        { new: true }
      );
  
      // Update each student with the new mentor
      await Student.updateMany({ _id: { $in: studentIds } }, { mentor: mentorId });
  
      res.status(200).json({ mentor });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

const  getStudentsOfMentor = async (req, res) => {
    try {
      const mentorId = req.params.mentorId;
      const mentor = await Mentor.findById(mentorId).populate('students');
      res.status(200).json(mentor.students);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  

module.exports = {
    createMentor,
    getStudentsForMentor,
    getMentors,
    addStudentsToMentor,
    getStudentsOfMentor,
}