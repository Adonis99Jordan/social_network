import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
// import Thought from './Thought';

const { Schema, model } = mongoose;
const { hash, compare } = bcrypt

// User Schema
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Your password must be at leat 6 characters in length']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}); 

// Pre-save middleware to hash the password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await hash(this.password, saltRounds);
    }
    next();
});

// Method to compare and validate password
userSchema.methods.isCorrectPassword = async function(password: any) {
    return compare(password, this.password);
};

// To get friend count
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', userSchema);

export default User;