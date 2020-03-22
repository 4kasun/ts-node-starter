import * as mongoose from 'mongoose';
import { UserService } from '../services/userService';
import { Request, Response } from 'express';
import User from '../common/interfaces/user'

export class UserController {

    /**
     * get all users
     * @param req 
     * @param res 
     */
    public async all(req: Request, res: Response) {
        try {
            let userService = new UserService();
            const user = await userService.getAll(req.body);
            return res.status(201).send(user)
        } catch (e) {
            return res.status(400).send({ message: e.message })
        }
    }

    /**
     * get user details by id
     * @param req 
     * @param res 
     */
    public async getOne(req: Request, res: Response) {
        const _id = req.params.id;
        try {
            let userService = new UserService();
            const user = await userService.getOne(_id)
            if (!user) {
                res.status(404).send()
            }
            return res.send(user)
        } catch (e) {
            return res.status(500).send({ message: e.message })
        }
    }

    /**
     * Update user data
     * @param req 
     * @param res 
     */
    public async update(req: Request, res: Response) {
         const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'email', 'password', 'age']

        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' });
        }

        try {
            let userService = new UserService();
            const user = await userService.update(req)
            return res.send(user);
        } catch (e) {
            return res.status(400).send({ message: e.message })
        }
    }

    /**
     * store users
     * @param req 
     * @param res 
     */
    public async store(req: Request, res: Response) {
        try {
            let userData: User = req.body;
            let userService = new UserService();
            const user = await userService.store(userData);
            return res.status(201).send(user)
        } catch (e) {
            return res.status(400).send({ message: e.message })
        }
    }

    /**
     * delete user by id
     * @param req 
     * @param res 
     */
    public async delete(req: Request, res: Response){
        try {
            const _id = req.params.id;
            let userService = new UserService();
            const user = await userService.delete(_id);
            return res.status(201).send(user)
        } catch (e) {
            return res.status(500).send({ message: e.message })
        }
    }

    /**
     * user login
     * @param req
     * @param res 
     */
    public async login(req: Request, res: Response) {
        try {
            let userService = new UserService();
            const user = await userService.verifyCredentials(req);
            return res.send(user);
        } catch (e) {
            return res.status(400).send({ message: e.message })
        }
    }

}