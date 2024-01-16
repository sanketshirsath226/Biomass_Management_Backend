const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        throw new Error('Invalid email address');
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    enum: ['depot', 'harvestor', 'refinery'],
    required: true, // Assuming all users must have a role
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetToken: {
    type: String,
  },
  resetTokenExpires: {
    type: Date,
  },

});

// Pre-save hook for password hashing
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {a
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method for password comparison
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateToken = function () {
    const token = crypto.randomBytes(20).toString('hex');
    this.resetToken = token;
    this.resetTokenExpires = Date.now() + 3600000; // 1 hour
    return token;
  };

module.exports = mongoose.model('User', userSchema);
