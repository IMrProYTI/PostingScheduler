import { z } from "zod";

import uuid from "../base/uuid";
import attachment, { attachmentCreate, attachmentConnect } from "./attachment";


const schema = z.object({
	id: uuid,
	content: z.string(),
	attachments: z.array(attachment),
	type: z.enum(["Default", "Suggestion", "Draft"])
});

const schemaCreate = schema
	.omit({ id: true })
	.extend({
		attachments: z.array( z.union([ attachmentCreate, attachmentConnect ]) )
	});

const schemaConnect = schema
	.pick({ id: true })
	.extend({
		attachments: z.array(
			z.union([ attachmentCreate, attachmentConnect ])
		)
	});;

const schemaUpdate = schema
	.omit({ id: true })
	.extend({
		attachments: z.array(
			z.union([
				attachmentCreate, 
				attachment.partial().required({ id: true })
			])
		)
	})
	.partial();


type schemaCreate = z.infer<typeof schemaCreate>;
type schemaConnect = z.infer<typeof schemaConnect>;
type schemaUpdate = z.infer<typeof schemaUpdate>;


export { schemaCreate as postCreate, schemaConnect as postConnect, schemaUpdate as postUpdate };
export type { schemaCreate as postCreateType, schemaConnect as postConnectType, schemaUpdate as postUpdateType };
export default schema;