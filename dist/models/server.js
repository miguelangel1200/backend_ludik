"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("../database/db"));
const user_1 = __importDefault(require("../routes/user"));
const activity_1 = __importDefault(require("../routes/activity"));
class Server {
    constructor() {
        this.apiPaths = {
            users: "/api/users",
            activities: "/api/activities",
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "";
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db_1.default.authenticate();
                console.log('db connection established');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)({
            origin: process.env.URL_CORS || "",
            credentials: true,
        }));
        // READ BODY
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(this.apiPaths.users, user_1.default);
        this.app.use(this.apiPaths.activities, activity_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('listening on port ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map