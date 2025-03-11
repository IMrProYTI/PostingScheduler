import { z } from "zod";


const schema = z.object({
	PORT: z.coerce.number()
})


export default schema;