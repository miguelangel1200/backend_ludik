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
exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll();
        res.json({
            message: "Usuarios",
            users: users
        });
    }
    catch (error) {
        res.status(404).json({
            error: error.message,
        });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        res.status(200).json({
            message: "User",
            user: user
        });
    }
    catch (error) {
        res.status(400).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const existEmail = yield user_1.default.findOne({ where: { email } });
        const existUsername = yield user_1.default.findOne({ where: { username } });
        if (existEmail) {
            return res.status(400).json({
                msg: `El correo ya existe ${email}.`
            });
        }
        if (existUsername) {
            return res.status(400).json({
                msg: `El usuario ya existe ${username}.`
            });
        }
        yield user_1.default.create({
            username: username,
            email: email,
            password: password,
            createdAt: new Date(),
            updateAt: new Date()
        });
        res.json(`Usuario ${username} con ${email} creado con éxito`);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Error: ' + error.message
        });
    }
});
exports.postUser = postUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: `User not found with id ${id}`
            });
        }
        yield user.update(body);
        res.json({
            msg: `User updated successfully`,
            user: user
        });
    }
    catch (error) {
        res.status(500).json({
            msg: `Error updating user`
        });
    }
});
exports.putUser = putUser;
//# sourceMappingURL=users.js.map