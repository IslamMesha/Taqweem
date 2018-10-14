var mongoose = require('mongoose');
var uuid = require('node-uuid');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var uniqueValidator = require('mongoose-unique-validator');
require('mongoose-uuid2')(mongoose);
var UUID = mongoose.Types.UUID;

// To fix all deprecation warnings.
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var UserSchema = new mongoose.Schema(
    {
        _id: { type: UUID, default: uuid.v4 },
        username: { type: String, required: [true, "Can't be blank."], match: [/^[a-zA-Z0-9]+$/, 'Email is not valid.'], index: true, trim: true, unique: true },
        email: { type: String, lowercase: true, required: [true, "Can't be blank."], match: [/\S+@\S+\.\S+/, 'Email is not valid.'], index: true, trim: true, unique: true },
        password: { type: String, minlength: [6, "At least 6 characters."] },
        firstName: {
            type: String, required: true, validate: {
                validator: function (value) {
                    return value !== undefined
                }
            }
        },
        lastName: {
            type: String, required: true, validate: {
                validator: function (value) {
                    return value !== undefined
                }
            }
        },
        avatar: { type: Buffer, required: true },
    }, { id: false }, { timestamps: true }
)

UserSchema.plugin(uniqueValidator, { message: "User is already taken." });
UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
}

UserSchema.methods.generateJWT = function () {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000)
    }, "secret")
}

UserSchema.methods.toAuthJSON = function () {
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
        avatar: this.avatar
    }
}

// IslamMesha
var User = mongoose.model('User', UserSchema);
module.exports = User;