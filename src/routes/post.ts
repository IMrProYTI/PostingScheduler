import { Router } from 'express';
import { post } from '../controllers';


const route = Router();

route.get('/:id', post.get);

route.post('/', post.create);

route.put('/:id', post.update);

route.delete('/:id', post.delete);


export default route;