import { Router } from 'express';
import { createChurchController } from '../controllers/church/churchController';


const chuchRoutes = Router();

chuchRoutes.post('/', createChurchController);    

export default chuchRoutes;
