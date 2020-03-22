import * as mongoose from 'mongoose';
import { UserSchema } from '../models/user';

const User: any = mongoose.model('User', UserSchema);

export class UserService {

    /**
     * storing data
     * @param data 
     */
    public async store(data: any) {
        let user = new User(data);
        try {
            await user.save();
            return { user };
        } catch (e) {
            throw new Error(e)
        }
    }

    /**
     * get all user data
     * @param data 
     */
    public async getAll(data: any) {
        try {
            let users = await User.find();
            return { users };
        } catch (e) {
            throw new Error(e)
        }
    }

    /**
     * get user by id
     * @param _id
     */
    public async getOne(_id: string) {
        try {
            const user = await User.findById(_id)
            return user;
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * update user data
     * @param req
     */
    public async update(req: any) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

            return user;
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * delete user by id
     * @param id
     */
    public async delete(id: string) {
        try {
            const user = await User.findByIdAndRemove(id);
            return user;
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * verify credentials by login method
     * @param req
     */
    public async verifyCredentials(req: any) {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password);
            const token = await user.generateAuthToken();
            return { user, token };
        } catch (e) {
            throw new Error(e)
        }
    }
}