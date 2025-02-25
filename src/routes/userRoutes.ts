import { Router } from 'express';
import { signUp, getUsersController} from '../controllers/user/userController';

const userRouter = Router();

userRouter.post('/signup', signUp);    
//userRouter.post('/login', login);    
userRouter.get('/', getUsersController);
/* userRouter.put('/:id', editUsersController);
userRouter.delete('/:id', deleteUserController); */

export default userRouter;
