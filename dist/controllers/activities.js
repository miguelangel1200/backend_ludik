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
exports.deleteActivity = exports.putActivity = exports.postActivity = exports.getActivity = exports.getActivities = void 0;
const activity_1 = __importDefault(require("../models/activity"));
const getActivities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activities = yield activity_1.default.findAll({
            where: {
                activate: 1
            }
        });
        res.status(200).json({
            msg: "Activities",
            activities: activities
        });
    }
    catch (error) {
        res.status(404).json({
            error: error.message
        });
    }
});
exports.getActivities = getActivities;
const getActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const activity = yield activity_1.default.findByPk(id);
        if (!activity) {
            return res.status(400).json({
                msg: 'Activity null'
            });
        }
        res.status(200).json({
            msg: "Activity",
            activity: activity
        });
    }
    catch (error) {
        res.status(404).json({
            msg: `Activity not exist`,
        });
    }
});
exports.getActivity = getActivity;
const postActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, users_idusers } = req.body;
    console.log(title, description, users_idusers);
    try {
        yield activity_1.default.create({
            title: title,
            description: description,
            users_idusers: users_idusers,
            createdAt: new Date(),
            updateAt: new Date()
        });
        res.status(200).json({
            msg: "Success"
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Error: " + error.message
        });
    }
});
exports.postActivity = postActivity;
const putActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const activity = yield activity_1.default.findByPk(id);
        yield (activity === null || activity === void 0 ? void 0 : activity.update(body));
        res.json({
            msg: 'Activity updated successfully',
            activity: activity
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Activity update failed' + error.message
        });
    }
});
exports.putActivity = putActivity;
// Eliminar una actividad (marcar como inactiva: setear activate a 0)
const deleteActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const activity = yield activity_1.default.findByPk(id);
        if (!activity) {
            return res.status(404).json({
                msg: "Activity not found",
            });
        }
        // Cambiar el estado 'activate' a 0 para eliminar lógicamente
        yield activity.update({ activate: 0 });
        res.status(200).json({
            msg: "Activity deleted successfully (set to inactive)",
            activity: activity,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Activity deletion failed: " + error.message,
        });
    }
});
exports.deleteActivity = deleteActivity;
//# sourceMappingURL=activities.js.map