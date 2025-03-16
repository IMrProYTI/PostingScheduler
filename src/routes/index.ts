import { Router } from 'express';


const route = Router();

import booru from './booru.get';
route.use('/booru', booru);


export default route;