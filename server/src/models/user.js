const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { hash, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');


const user = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }
}, { timestamps: false });

user.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await hash(this.password, 10);
        return next();
    }
    return next();
});

user.methods.generateJWT = async function () {
    return await sign({ id: this._id }, process.env.USER_TOKEN, { expiresIn: '30d', });
};

user.methods.generateJWTSeller = async function () {
    return await sign({ id: this._id }, process.env.SELLER_TOKEN, { expiresIn: '30d', });
};

user.methods.comparePassword = async function (enteredPassword) {
    return await compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', user);