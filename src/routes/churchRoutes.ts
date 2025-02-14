import { Router } from 'express';
import { createUserController } from '../controllers/church/churchController';


const chuchRouter = Router();

chuchRouter.post('/', createUserController);    

export default chuchRouter;
