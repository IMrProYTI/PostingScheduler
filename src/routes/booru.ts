import { Router } from 'express';
import BooruController from '../controllers/booru';


const route = Router();

route.get('/random', BooruController.random);

route.get('/:id', BooruController.get);


export default route;