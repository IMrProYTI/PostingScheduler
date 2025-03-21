import { z } from "zod";

import uuid from "../base/uuid";


const schema = z.object({
	id: uuid.optional(),
	fileURL: z.string()
});


export default schema;