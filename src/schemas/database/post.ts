import { z } from "zod";

import uuid from "../base/uuid";
import attachment from "./attachment";


const schema = z.object({
	id: uuid.optional(),
	content: z.string(),
	attachments: z.array(attachment).optional()
});


export default schema;