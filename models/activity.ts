import { DataTypes } from "sequelize";
import db from "../database/db";

const Activity = db.define("Activity", {
    idactivities: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.ENUM('PENDIENTE', 'EN PROCESO', 'COMPLETADA'),
        defaultValue: "PENDIENTE",
        allowNull: false
    },
    activate: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        allowNull: false
    },
    users_idusers: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updateAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updateAt'
});

export default Activity;