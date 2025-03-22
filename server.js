require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Ensure .env has MONGO_URI
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI is missing in .env file');
  process.exit(1);
}

// ✅ Middlewares
app.use(express.json({ limit: '10mb' })); // 🛠️ Support large JSON payloads
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // 🛠️ Support form data
app.use(cors());      // 🌐 Enable CORS for frontend
app.use(helmet());    // 🛡️ Secure HTTP headers
app.use(morgan('dev')); // 📋 Request logging

// ✅ Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: '⚠️ Too many requests, please try again later.',
});
app.use(limiter);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  });

// ✅ Routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const petRoutes = require('./routes/petRoutes'); // ✅ Make sure this file exists

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/pets', petRoutes); // 🐾 Pets endpoints

// ✅ Root route
app.get('/', (req, res) => {
  res.send('🚀 Welcome to the MEAN Stack API!');
});

// ✅ Catch-all for unknown routes
app.use('*', (req, res) => {
  res.status(404).json({ msg: '❌ Route not found' });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err.message);
  res.status(500).json({ msg: 'Internal Server Error' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
