const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({

    // Basic field — just a type
    name: String,

    // Field with rules
    email: {
        type: String,        // must be a string
        required: true,      // cannot be empty
        unique: true,        // no two users can have same email
        lowercase: true,     // automatically converts to lowercase before saving
        trim: true,          // removes whitespace from both ends
    },

    password: {
        type: String,
        required: true,
        minlength: 6,        // minimum 6 characters
    },

    phone: {
        type: String,
        required: true,
        unique: true
    },

    // A nested object
    address: {
        street: String,
        city: String,
        pincode: String,
    },

    // An array of strings
    wishlist: [String],

    // Boolean with default
    isActive: {
        type: Boolean,
        default: true,
    }

}, { timestamps: true });
//   ^^^^^^^^^^^^^^^^
//   This automatically adds two fields to every document:
//   createdAt — when the document was first created
//   updatedAt — when the document was last modified


//Hash the password before saving
userSchema.pre('save', async function(next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);
})


//Helper function to compare the passwords
userSchema.methods.comparePassword = function(candidate){
    return bcrypt.compare(candidate, this.password)
}

const user = mongoose.model("user", userSchema);

module.exports = user;