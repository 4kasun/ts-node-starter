import { Request, Response, Router } from "express";
import { UserController } from "../../controllers/userController";
import Auth from "../../middleware/auth";
class UserRoutes {

    /**
     * define user controller object
     */
    userController: UserController = new UserController();

    /**
     * define express router
     */
    public router: Router;

    public constructor() {
        this.router = Router();
        this.routes();
    }

    /**
     * add all user related routes here
     */
    public routes(): void {
        this.router.post('/', Auth, this.userController.store);
        this.router.get('/', Auth ,this.userController.all);
        this.router.get('/:id', Auth, this.userController.getOne);
        this.router.patch('/:id', Auth, this.userController.update);
        this.router.delete('/:id', Auth, this.userController.delete);

        this.router.post('/login', this.userController.login);
    }
}

/**
 * creating user route object
 */
const userRoutes = new UserRoutes();
userRoutes.routes();

export default userRoutes.router;