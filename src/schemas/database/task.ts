import { z } from "zod";

import uuid from "../base/uuid";
import post, { postCreate, postConnect, postUpdate } from "./post";
import social, { socialCreate } from "./social";


const schema = z.object({
	id: uuid,
	post: post,
	socials: z.array(social).nonempty(),
	post_timestamp: z.date()
});

const schemaCreate = schema
	.omit({ id: true })
	.extend({
		post: z.union([ postCreate, postConnect ]),
		social: postConnect
});

const schemaConnect = schema
	.pick({ id: true })
	.extend({
		post: z.union([ postCreate, postConnect ]),
		social: postConnect
	});

const schemaUpdate = schema
	.omit({ id: true })
	.extend({
		post: z.union([
			postCreate,
			post.partial().required({ id: true })
		]),
		social: z.union([
			socialCreate,
			social.partial().required({ id: true })
		])
	})
	.partial();


type schemaCreate = z.infer<typeof schemaCreate>;
type schemaConnect = z.infer<typeof schemaConnect>;
type schemaUpdate = z.infer<typeof schemaUpdate>;


export { schemaCreate as taskCreate, schemaConnect as taskConnect, schemaUpdate as taskUpdate };
export type { schemaCreate as taskCreateType, schemaConnect as taskConnectType, schemaUpdate as taskUpdateType };
export default schema;