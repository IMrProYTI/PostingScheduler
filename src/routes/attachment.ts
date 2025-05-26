import { Router } from "express";
import { attachment } from "../controllers";


const route = Router();

route.get('/', attachment.getAll);

route.get('/:id', attachment.get);

route.post('/', attachment.create);

// route.put('/:id', attachment.update);

route.delete('/:id', attachment.delete);


export default route;