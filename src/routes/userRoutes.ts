import { Router } from 'express';
import { createUserController, getUsersController, editUsersController, deleteUserController } from '../controllers/user/userController';

const router = Router();

router.post('/', createUserController);    
router.get('/', getUsersController);
router.put('/:id', editUsersController);
router.delete('/:id', deleteUserController);

export default router;
