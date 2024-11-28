import { DataTypes } from "sequelize";
import db from "../database/db";

const User = db.define("User", {
    idusers: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
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

export default User;