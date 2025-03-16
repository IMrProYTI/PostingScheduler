import { z } from "zod";


const schema = z.object({
	id: z.string().uuid(),
	fileURL: z.string()
});


export default schema;