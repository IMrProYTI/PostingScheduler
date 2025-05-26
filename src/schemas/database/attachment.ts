import { z } from "zod";

import uuid from "../base/uuid";


const schema = z.object({
	id: uuid,
	path: z.string(),
	type: z.enum(["External", "Local"])
});

const schemaCreate = schema
	.omit({ id: true });

const schemaConnect = schema
	.pick({ id: true });

const schemaUpdate = schema
	.partial()
	.required({ id: true });


type schemaCreate = z.infer<typeof schemaCreate>;
type schemaConnect = z.infer<typeof schemaConnect>;
type schemaUpdate = z.infer<typeof schemaUpdate>;


export { schemaCreate as attachmentCreate, schemaConnect as attachmentConnect, schemaUpdate as attachmentUpdate };
export type { schemaCreate as attachmentCreateType, schemaConnect as attachmentConnectType, schemaUpdate as attachmentUpdateType };
export default schema;