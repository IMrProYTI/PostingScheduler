import { z } from "zod";
import post from "./post";
import social from "./social";


const schema = z.object({
	id: z.string().uuid(),
	post: post,
	socials: z.array(social).nonempty(),
	post_timestamp: z.date()
});


export default schema;