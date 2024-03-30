// mentorRoutes.js
const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');

router.post('/create-mentor', mentorController.createMentor);
router.get('/:mentorId/students', mentorController.getStudentsForMentor);
router.get('/', mentorController.getMentors);
router.post('/:mentorId/add-students', mentorController.addStudentsToMentor);
router.get('/:mentorId/students-of-mentor', mentorController.getStudentsOfMentor);


module.exports = router;
