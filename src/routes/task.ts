import { Router } from "express";
import TaskController from '../controllers/task';


const route = Router();

route.get('/', TaskController.getAll);

route.get('/:id', TaskController.get);

route.post('/', TaskController.create);

route.put('/:id', TaskController.update);

route.delete('/:id', TaskController.del);


export default route;