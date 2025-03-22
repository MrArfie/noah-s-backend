const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');

// ➕ Submit Volunteer Form
router.post('/', async (req, res) => {
  try {
    const volunteer = new Volunteer(req.body);
    const saved = await volunteer.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Volunteer Submission Error:', err);
    res.status(500).json({ error: 'Failed to submit volunteer form' });
  }
});

// 📋 Get All Volunteer Submissions (for Admin)
router.get('/', async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ submittedAt: -1 });
    res.status(200).json(volunteers);
  } catch (err) {
    console.error('Volunteer Fetch Error:', err);
    res.status(500).json({ error: 'Failed to fetch volunteers' });
  }
});

module.exports = router;
