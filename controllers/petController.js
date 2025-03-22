const Pet = require('../models/Pet');

// 🐾 Get All Pets
exports.getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find();
        res.json(pets);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// 🐶 Get Single Pet by ID
exports.getPetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) {
            return res.status(404).json({ msg: 'Pet not found' });
        }
        res.json(pet);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// ➕ Add New Pet (Admin Only)
exports.addPet = async (req, res) => {
    const { name, breed, age, description, image } = req.body;

    try {
        const newPet = new Pet({
            name,
            breed,
            age,
            description,
            image,
            adopted: false
        });

        await newPet.save();
        res.json({ msg: 'Pet added successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// ✅ Approve Pet Adoption (Admin Only)
exports.approveAdoption = async (req, res) => {
    try {
        let pet = await Pet.findById(req.params.id);
        if (!pet) {
            return res.status(404).json({ msg: 'Pet not found' });
        }

        pet.adopted = true;
        await pet.save();

        res.json({ msg: 'Adoption approved' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// ❌ Delete Pet (Admin Only)
exports.deletePet = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) {
            return res.status(404).json({ msg: 'Pet not found' });
        }

        await pet.deleteOne();
        res.json({ msg: 'Pet deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
