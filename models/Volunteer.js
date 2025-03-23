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
    console.error('❌ Volunteer Submission Error:', err.message);
    res.status(500).json({ error: 'Failed to submit volunteer form' });
  }
});

// 📋 Get All Volunteer Submissions (for Admin)
router.get('/', async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.status(200).json(volunteers);
  } catch (err) {
    console.error('❌ Volunteer Fetch Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch volunteers' });
  }
});

// 🔁 Update Volunteer Status or Notes
router.patch('/:id', async (req, res) => {
  try {
    const updated = await Volunteer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Volunteer not found' });
    res.status(200).json(updated);
  } catch (err) {
    console.error('❌ Volunteer Update Error:', err.message);
    res.status(500).json({ error: 'Failed to update volunteer' });
  }
});

// 🗑️ Delete Volunteer Entry
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Volunteer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Volunteer not found' });
    res.status(200).json({ message: 'Volunteer application deleted successfully' });
  } catch (err) {
    console.error('❌ Volunteer Deletion Error:', err.message);
    res.status(500).json({ error: 'Failed to delete volunteer' });
  }
});

module.exports = router;
