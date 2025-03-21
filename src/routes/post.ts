import { Router } from 'express';
import PostController from '../controllers/post';


const route = Router();

route.get('/:id', PostController.get);

route.post('/', PostController.create);

route.put('/', PostController.update);

route.delete('/', PostController.del);


export default route;