import { z } from "zod";

import uuid from "../base/uuid";
import post from "./post";
import social from "./social";


const schema = z.object({
	id: uuid.optional(),
	post: post,
	socials: z.array(social).nonempty(),
	post_timestamp: z.date()
});


export default schema;