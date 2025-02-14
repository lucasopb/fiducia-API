import { Router } from 'express';
import { createUserController, getUsersController, editUsersController, deleteUserController } from '../controllers/user/userController';

const userRouter = Router();

userRouter.post('/', createUserController);    
userRouter.get('/', getUsersController);
userRouter.put('/:id', editUsersController);
userRouter.delete('/:id', deleteUserController);

export default userRouter;
