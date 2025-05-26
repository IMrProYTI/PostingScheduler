import { z } from "zod";

import uuid from "../base/uuid";


const schema = z.object({
	id: uuid,
	type: z.string()
});

const schemaCreate = schema
	.omit({ id: true });

const schemaConnect = schema
	.pick({ id: true });

const schemaUpdate = schema
	.omit({ id: true })
	.partial();


type schemaCreate = z.infer<typeof schemaCreate>;
type schemaConnect = z.infer<typeof schemaConnect>;
type schemaUpdate = z.infer<typeof schemaUpdate>;


export { schemaCreate as socialCreate, schemaConnect as socialConnect, schemaUpdate as socialUpdate };
export type { schemaCreate as socialCreateType, schemaConnect as socialConnectType, schemaUpdate as socialUpdateType };
export default schema;