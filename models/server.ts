import express, { Application } from 'express';
import cors from 'cors';
import db from '../database/db';

import userRoutes from "../routes/user";
import activityRoutes from "../routes/activity";

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        users: "/api/users",
        activities: "/api/activities",
    };

    constructor(){
        this.app = express();
        this.port = process.env.PORT || "";

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log('db connection established');
        } catch (error: any) {
            throw new Error(error)
        }
    }

    middlewares(){
        // CORS
        this.app.use(
            cors({
                origin:process.env.URL_CORS || "",
                credentials: true,
            })
        );

        // READ BODY
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.apiPaths.users, userRoutes);
        this.app.use(this.apiPaths.activities, activityRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('listening on port ' + this.port);
        })
    }
}

export default Server;