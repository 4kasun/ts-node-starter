// /app/routes/index.ts
import { Request, Response, Router } from "express";
import UserRoutes from "./v1/user";
import Auth from "../middleware/auth";

export class Routes {

    public router: Router;

    constructor() {
        this.router = Router()
    }

    /**
     * Main router
     * @param app 
     */
    public routes(app: any): void {
        /**
         * define root route
         */
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send('Hello Good World!');
            });

        /**
         * user routes
         */
        app.use('/api/v1/users', UserRoutes);


    }
}
