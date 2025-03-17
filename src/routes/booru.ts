import { Router } from 'express';


const route = Router();

import random from '../controllers/booru/random';
route.get('/random', random);

import current from '../controllers/booru/current';
route.get('/:id', current);


export default route;