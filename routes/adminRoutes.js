const express = require('express');
const { 
    getAllUsers, updateUserRole, deleteUser,
    getAllPets, getPetById, addPet, updatePet, deletePet,
    getAllAdoptions, approveAdoption, rejectAdoption,
    getAllVolunteers, approveVolunteer, rejectVolunteer
} = require('../controllers/adminController'); // Moved logic to `adminController.js`
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

/**
 * 🛠 USER MANAGEMENT (Admin Only)
 */
// 👥 Get All Users
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);

// 🔄 Update User Role (Make Admin/User)
router.put('/users/:id/role', authMiddleware, adminMiddleware, updateUserRole);

// ❌ Delete User
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);

/**
 * 🐾 PET MANAGEMENT (Admin Only)
 */
// 📝 Get All Pets
router.get('/pets', getAllPets);

// 🔍 Get Pet by ID
router.get('/pets/:id', getPetById);

// ➕ Add a New Pet
router.post('/pets', authMiddleware, adminMiddleware, addPet);

// ✏️ Update Pet Details
router.put('/pets/:id', authMiddleware, adminMiddleware, updatePet);

// ❌ Delete Pet
router.delete('/pets/:id', authMiddleware, adminMiddleware, deletePet);

/**
 * ✅ ADOPTION MANAGEMENT (Admin Only)
 */
// 📜 Get All Adoption Requests
router.get('/adoptions', authMiddleware, adminMiddleware, getAllAdoptions);

// ✅ Approve Adoption
router.put('/adoptions/:id/approve', authMiddleware, adminMiddleware, approveAdoption);

// ❌ Reject Adoption
router.put('/adoptions/:id/reject', authMiddleware, adminMiddleware, rejectAdoption);

/**
 * 🤝 VOLUNTEER MANAGEMENT (Admin Only)
 */
// 📜 Get All Volunteer Applications
router.get('/volunteers', authMiddleware, adminMiddleware, getAllVolunteers);

// ✅ Approve Volunteer Application
router.put('/volunteers/:id/approve', authMiddleware, adminMiddleware, approveVolunteer);

// ❌ Reject Volunteer Application
router.put('/volunteers/:id/reject', authMiddleware, adminMiddleware, rejectVolunteer);

module.exports = router;
