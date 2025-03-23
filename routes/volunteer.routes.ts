// routes/volunteer.routes.ts
const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');

// Submit Volunteer Form
router.post('/', async (req, res) => {
  try {
    const newVolunteer = new Volunteer(req.body);
    const saved = await newVolunteer.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to submit volunteer form' });
  }
});

// Get All Volunteer Submissions
router.get('/', async (req, res) => {
  try {
    const submissions = await Volunteer.find();
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch volunteers' });
  }
});

module.exports = router;
