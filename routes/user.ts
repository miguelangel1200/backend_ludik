import { Router } from "express";
import {
    getUser, getUsers, postUser, putUser
} from "../controllers/users";

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', postUser);
router.put('/:id', putUser);

export default router;