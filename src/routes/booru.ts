import { Router } from 'express';
import { booru } from '../controllers';


const route = Router();

route.get('/random', booru.random);

route.get('/:id', booru.get);


export default route;