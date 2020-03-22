import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';
import { UserSchema } from '../models/user';

const User: any = mongoose.model('User', UserSchema);

const auth = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const bearerToken = req.header('Authorization');
        const token: any = bearerToken?.replace('Bearer ', '');
        const decoded: any = jwt.verify(token, 'kasuna');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token' : token });
        if (!user) {
            throw new Error()
        }
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
}

export default auth