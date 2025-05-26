import { z } from "zod";
import attachment from "./attachment";


const schema = z.object({
	id: z.string().uuid(),
	content: z.string(),
	attachments: z.array(attachment)
});


export default schema;