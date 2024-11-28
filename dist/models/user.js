"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../database/db"));
const User = db_1.default.define("User", {
    idusers: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updateAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updateAt'
});
exports.default = User;
//# sourceMappingURL=user.js.map