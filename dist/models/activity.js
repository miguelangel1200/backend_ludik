"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../database/db"));
const Activity = db_1.default.define("Activity", {
    idactivities: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: sequelize_1.DataTypes.ENUM('PENDIENTE', 'EN PROCESO', 'COMPLETADA'),
        defaultValue: "PENDIENTE",
        allowNull: false
    },
    activate: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 1,
        allowNull: false
    },
    users_idusers: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
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
exports.default = Activity;
//# sourceMappingURL=activity.js.map