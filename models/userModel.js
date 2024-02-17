const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    // validate(value) {
    //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //   if (!emailRegex.test(value)) {
    //     throw new Error('Invalid email address');
    //   }
    // },
  },
  mobile : {
    type : String,
    required : true,
    unique : true,
    minLength : 10
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    enum: ['depot', 'harvester', 'refinery'],
    required: false, // Assuming all users must have a role
  },
  location : {
    type : {
      longitude : {
        type : String,
        required : false
      },
      latitude : {
        type : String,
        required : false
      }
    },
    required : false
  },
    isVerified : {
    default : false,
    require : true,
    type : Boolean
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
  if (this.isModified('password')) {
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
    this.resetTokenExpires = Date.now() + 5 * 60 * 1000; // 5 min
    return token;
  };

module.exports = mongoose.model('User', userSchema);
