// app/app.ts
import express from "express";
import { Routes } from "./routes";
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json'

class App {
    public app: express.Application;
    public route: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.route.routes(this.app);
        this.mongoSetup();

        this.app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    /**
     * set headers
     */
    private config(): void {

        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            next();
        });

        // support application/json type post data
        this.app.use(express.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(express.urlencoded({ extended: false }));
    }

    /**
     * set up mongodb
     */
    private mongoSetup(): void {
        mongoose.connect('mongodb://127.0.0.1:27017/school', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        })
            .then(() => console.log('connection successful'))
            .catch((err) => console.error(err));
    }

}

export default new App().app;
