import { z } from "zod";


const schema = z.object({
	id: z.string().uuid(),
	filePath: z.string()
});


export default schema;