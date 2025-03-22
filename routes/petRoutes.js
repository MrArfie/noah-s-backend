const express = require('express');
const Pet = require('../models/Pet');
const router = express.Router();

// 📌 GET all pets
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find();
    const formattedPets = pets.map(pet => ({
      id: pet._id, // ✅ Convert _id to id
      name: pet.name,
      breed: pet.breed,
      age: pet.age,
      image: pet.image,
      description: pet.description,
      adopted: pet.adopted,
      category: pet.category
    }));
    res.json(formattedPets);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// ➕ POST a new pet
router.post('/', async (req, res) => {
  try {
    const newPet = new Pet(req.body);
    const savedPet = await newPet.save();
    const petWithId = { ...savedPet.toObject(), id: savedPet._id }; // ✅ Add id field
    res.status(201).json(petWithId);
  } catch (err) {
    console.error('Add Pet Error:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// 🗑️ DELETE pet by ID
router.delete('/:id', async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Pet deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// ✏️ UPDATE pet by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const petWithId = { ...updatedPet.toObject(), id: updatedPet._id }; // ✅ Add id field
    res.json(petWithId);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// ✅ GET pet by ID (for View Details)
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ msg: 'Pet not found' });

    const petWithId = { ...pet.toObject(), id: pet._id }; // ✅ Add id field
    res.json(petWithId);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
