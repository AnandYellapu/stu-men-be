// studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController')

router.post('/create', studentController.createStudent);
router.post('/:studentId/assign-mentor/:mentorId', studentController.assignMentor);
router.get('/:studentId/mentor', studentController.getAssignedMentor);
router.get('/', studentController.getStudents);
router.post('/:studentId/change-mentor/:newMentorId', studentController.changeMentor);
router.get('/:studentId/mentor', studentController.getMentorForStudent);
router.get('/:studentId/previous-mentor', studentController.getPreviousMentor);

module.exports = router;
