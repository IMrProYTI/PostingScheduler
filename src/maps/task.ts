import { Prisma } from "../config/prisma";
import { z } from "zod";

import schema from "../schemas/database/task";
import { createPostInput } from "./post";
import { createSocialInput } from "./socials";


export const createTaskInput = (data: z.infer<typeof schema>): Prisma.TaskCreateInput => {
	return {
		post: {
			connect: { id: data.post.id },
			create: createPostInput(data.post),
		},
		post_timestamp: data.post_timestamp,
		socials: {
			connect: data.socials.map(({ id }) => ({ id })),
			create: data.socials.map((el) => createSocialInput(el))
		}
	}
}

const optionalSchema = schema.deepPartial();
export const updateTaskInput = (data: z.infer<typeof optionalSchema>): Prisma.TaskUpdateInput => {
	return {
		post: {
			connect: data.post?.id ? { id: data.post.id } : undefined,
			create: data.post?.content ? createPostInput({ content: data.post.content }) : undefined,
		},
		post_timestamp: data.post_timestamp,
		socials: {
			connect: data.socials
				?.filter(({ id }) => (id))
				.map(({ id }) => ({ id: id! })),
			create: data.socials
				?.filter(({ type }) => (type))
				.map(({ type }) => createSocialInput({ type: type! }))
		}
	}
}