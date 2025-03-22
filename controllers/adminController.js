const User = require('../models/User');
const Pet = require('../models/Pet');
const Adoption = require('../models/Adoption');
const Volunteer = require('../models/Volunteer');

/**
 * 👥 USER MANAGEMENT
 */
// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update User Role (Make Admin/User)
exports.updateUserRole = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.role = req.body.role;
        await user.save();

        res.json({ msg: 'User role updated successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: 'User deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

/**
 * 🐾 PET MANAGEMENT
 */
// Get All Pets
exports.getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find();
        res.json(pets);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get Pet by ID
exports.getPetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) return res.status(404).json({ msg: 'Pet not found' });

        res.json(pet);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Add New Pet
exports.addPet = async (req, res) => {
    try {
        const newPet = new Pet(req.body);
        await newPet.save();
        res.json({ msg: 'Pet added successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update Pet
exports.updatePet = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pet) return res.status(404).json({ msg: 'Pet not found' });

        res.json({ msg: 'Pet updated successfully', pet });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete Pet
exports.deletePet = async (req, res) => {
    try {
        await Pet.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Pet deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

/**
 * ✅ ADOPTION MANAGEMENT
 */
// Get All Adoption Requests
exports.getAllAdoptions = async (req, res) => {
    try {
        const adoptions = await Adoption.find().populate('pet user', 'name email');
        res.json(adoptions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Approve Adoption
exports.approveAdoption = async (req, res) => {
    try {
        let adoption = await Adoption.findById(req.params.id);
        if (!adoption) return res.status(404).json({ msg: 'Adoption request not found' });

        adoption.status = 'Approved';
        await adoption.save();

        res.json({ msg: 'Adoption approved successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Reject Adoption
exports.rejectAdoption = async (req, res) => {
    try {
        let adoption = await Adoption.findById(req.params.id);
        if (!adoption) return res.status(404).json({ msg: 'Adoption request not found' });

        adoption.status = 'Rejected';
        await adoption.save();

        res.json({ msg: 'Adoption rejected successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

/**
 * 🤝 VOLUNTEER MANAGEMENT
 */
// Get All Volunteers
exports.getAllVolunteers = async (req, res) => {
    try {
        const volunteers = await Volunteer.find();
        res.json(volunteers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Approve Volunteer
exports.approveVolunteer = async (req, res) => {
    try {
        const volunteer = await Volunteer.findById(req.params.id);
        if (!volunteer) return res.status(404).json({ msg: 'Volunteer not found' });

        volunteer.status = 'Approved';
        await volunteer.save();

        res.json({ msg: 'Volunteer approved successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Reject Volunteer
exports.rejectVolunteer = async (req, res) => {
    try {
        const volunteer = await Volunteer.findById(req.params.id);
        if (!volunteer) return res.status(404).json({ msg: 'Volunteer not found' });

        volunteer.status = 'Rejected';
        await volunteer.save();

        res.json({ msg: 'Volunteer rejected successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
