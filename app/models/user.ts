import {Schema, model} from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * create user schema
 */
export const UserSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        trim: true,
        lowercase: true,
        // validate: {
        //     validator: function (value) {
        //         if (!validator.isEmail(value)) {
        //             throw new Error('Email is invalid')
        //         }
        //     }
        // }
    },
    password: {
        type: String,
        require: true,
        minlength: 7,
        trim: true,
        // validate: {
        //     validator: (value) => {
        //         if (value.toLowerCase().includes('password')) {
        //             throw new Error('Password cannot contain "password"')
        //         }
        //     }
        // }
    },
    age: {
        type: Number,
        default: 0,
        // validate: {
        //     validator: (value) {
        //         if (value < 0) {
        //             throw new Error('Age must be a positive number')
        //         }
        //     }
        // }
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }],
    roles: [{
        type: String,
        default: 'basic',
        enum: ['basic', 'supervisor', 'admin']
    }]
});

/**
 * unset confidantial data from user object
 * password, tokens
 */
UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

/**
 * generating authentication token
 */
UserSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, "kasuna");

    user.tokens = user.tokens.concat({ token: token });
    await user.save();

    return token;
}

/**
 * check user credentials
 */
UserSchema.statics.findByCredentials = async (email: string, password: string) => {
    const user:any = await model('User').findOne({ email });

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user;
};

/**
 * Hash the plain text password before saving
 */
UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        let hash = await bcrypt.hash(this.get('password'), 8);
        this.set('password', hash);
    }

    next();
});
