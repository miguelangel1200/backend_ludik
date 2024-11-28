import { Router } from "express";
import {
    getActivities, getActivity, postActivity, putActivity, deleteActivity
} from "../controllers/activities";

const router = Router();

router.get('/', getActivities);
router.get('/:id', getActivity);
router.post('/', postActivity);
router.put('/:id', putActivity);
router.delete('/:id', deleteActivity);

export default router;