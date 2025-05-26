import { Router } from "express";
import { task } from '../controllers';


const route = Router();

route.get('/', task.getAll);

route.get('/:id', task.get);

route.post('/', task.create);

route.put('/:id', task.update);

route.delete('/:id', task.delete);


export default route;