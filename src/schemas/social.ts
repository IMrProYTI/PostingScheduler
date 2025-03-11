import { z } from "zod";


const schema = z.object({
	id: z.string().uuid(),
	type: z.string()
});


export default schema;