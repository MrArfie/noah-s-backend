const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer'); // Make sure this model exists

// 📝 POST: Submit new volunteer application
router.post('/', async (req, res) => {
  try {
    const newVolunteer = new Volunteer(req.body);
    const saved = await newVolunteer.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('❌ Volunteer Submission Error:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// 📋 GET: All volunteer applications
router.get('/', async (req, res) => {
  try {
    const applications = await Volunteer.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// ✅ PATCH: Update status or notes
router.patch('/:id', async (req, res) => {
  try {
    const updated = await Volunteer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// 🗑️ DELETE: Remove volunteer application
router.delete('/:id', async (req, res) => {
  try {
    await Volunteer.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Volunteer application deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
