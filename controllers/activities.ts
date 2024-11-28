import { Request, Response } from "express";
import Activity from "../models/activity";

export const getActivities = async (req: Request, res: Response) => {
    try {
        const activities = await Activity.findAll({
            where: {
                activate: 1
            }
        });

        res.status(200).json({
            msg: "Activities",
            activities: activities
        });

    } catch (error: any) {
        res.status(404).json({
            error: error.message
        })
    }
}

export const getActivity = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        const activity = await Activity.findByPk(id);

        if (!activity) {
            return res.status(400).json({
                msg: 'Activity null'
            })
        }
        res.status(200).json({
            msg: "Activity",
            activity: activity
        });

    } catch (error) {
        res.status(404).json({
            msg: `Activity not exist`,
        });
    }
}

export const postActivity = async (req: Request, res: Response) => {
    const {
        title,
        description,
        users_idusers
    } = req.body;

    console.log(title, description, users_idusers);

    try {
        await Activity.create({
            title: title,
            description: description,
            users_idusers: users_idusers,
            createdAt: new Date(),
            updateAt: new Date()
        });

        res.status(200).json({
            msg: "Success"
        })
    } catch (error:any) {
        res.status(400).json({
            msg: "Error: " + error.message
        })
    }
}

export const putActivity = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const activity = await Activity.findByPk(id);
        
        await activity?.update(body);

        res.json({
            msg: 'Activity updated successfully',
            activity: activity
        })
    } catch (error:any) {
        res.status(500).json({
            msg: 'Activity update failed' + error.message
        })
    }
}

// Eliminar una actividad (marcar como inactiva: setear activate a 0)
export const deleteActivity = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const activity = await Activity.findByPk(id);
  
      if (!activity) {
        return res.status(404).json({
          msg: "Activity not found",
        });
      }
  
      // Cambiar el estado 'activate' a 0 para eliminar lógicamente
      await activity.update({ activate: 0 });
  
      res.status(200).json({
        msg: "Activity deleted successfully (set to inactive)",
        activity: activity,
      });
    } catch (error: any) {
      res.status(500).json({
        msg: "Activity deletion failed: " + error.message,
      });
    }
  };