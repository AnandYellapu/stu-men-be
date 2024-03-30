// studentController.js
const Student = require('../models/Student');
const Mentor = require('../models/Mentor');

const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const assignMentor = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const mentorId = req.params.mentorId;

    const student = await Student.findByIdAndUpdate(studentId, { mentor: mentorId }, { new: true });
    const mentor = await Mentor.findByIdAndUpdate(mentorId, { $push: { students: studentId } }, { new: true });

    res.status(200).json({ student, mentor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAssignedMentor = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findById(studentId).populate('mentor');
    res.status(200).json(student.mentor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getStudents = async (req, res) => {
    try {
      const students = await Student.find();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const changeMentor = async (req, res) => {
    try {
      const studentId = req.params.studentId;
      const newMentorId = req.params.newMentorId;
  
      const student = await Student.findByIdAndUpdate(studentId, { mentor: newMentorId }, { new: true });
      const newMentor = await Mentor.findByIdAndUpdate(newMentorId, { $push: { students: studentId } }, { new: true });
  
      res.status(200).json({ student, newMentor });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  const getMentorForStudent = async (req, res) => {
    try {
      const studentId = req.params.studentId;
      const student = await Student.findById(studentId).populate('mentor');
      
      res.status(200).json(student.mentor);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

 const getPreviousMentor = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findById(studentId);
    const previousMentorId = student.previousMentor;

    if (!previousMentorId) {
      return res.status(404).json({ message: 'No previous mentor found for the student.' });
    }

    const previousMentor = await Mentor.findById(previousMentorId);

    res.status(200).json(previousMentor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports ={
    createStudent,
    assignMentor,
    getAssignedMentor,
    getStudents,
    changeMentor,
    getMentorForStudent,
    getPreviousMentor,
}