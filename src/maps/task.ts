import { Prisma } from "../config/prisma";
import { z } from "zod";

import { createPostInput } from "./post";
import type { postCreateType } from "../schemas/database/post";
import type { socialConnectType } from "../schemas/database/social";
import type { taskCreateType, taskUpdateType } from "../schemas/database/task";


export const createTaskInput = (data: taskCreateType): Prisma.TaskCreateInput => {
	return {
		...data,
		post: {
			connect: 'id' in data.post ? { id: data.post.id } : undefined,
			create: !('id' in data.post) ? createPostInput(data.post) : undefined,
		},
		socials: {
			connect: data.socials.map(({ id }) => ({ id }))
		}
	}
}

export const updateTaskInput = (data: taskUpdateType): Prisma.TaskUpdateInput => {
	return {
		...data,
		post: {
			connect: 'id' in data.post! ? { id: data.post.id as string } : undefined,
			create: !('id' in data.post!) ? createPostInput(data.post as postCreateType) : undefined,
		},
		socials: {
			connect: data.socials ?
				data.socials
					.filter((el) => 'id' in el)
					.map((el) => ({ id: el.id }))
				: undefined,
		}
	}
}