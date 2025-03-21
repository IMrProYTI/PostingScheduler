import { Router } from "express";
import AttachmentController from '../controllers/attachment';


const route = Router();

route.get('/:id', AttachmentController.get);

route.post('/', AttachmentController.create);

route.put('/:id', AttachmentController.update);

route.delete('/:id', AttachmentController.del);


export default route;