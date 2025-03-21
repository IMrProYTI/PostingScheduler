import { Router } from 'express';


const route = Router();

import attachment from './attachment';
route.use('/attachment', attachment);

import post from './post';
route.use('/post', post);

import task from './task';
route.use('/task', task);

import booru from './booru';
route.use('/booru', booru);


export default route;