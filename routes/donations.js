const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation'); // Make sure filename is correct!

// Submit
router.post('/', async (req, res) => {
  try {
    const donation = new Donation(req.body);
    const saved = await donation.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit donation' });
  }
});

// Get all
router.get('/', async (req, res) => {
  try {
    const all = await Donation.find();
    res.status(200).json(all);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Donation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Donation deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

// ✅ EXPORT router only
module.exports = router;
