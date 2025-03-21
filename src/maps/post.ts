import { Prisma } from "../config/prisma";
import { z } from "zod";

import schema from "../schemas/database/post";
import { createAttachmentInput } from "./attachment";


export const createPostInput = (data: z.infer<typeof schema>): Prisma.PostCreateInput => {
	return {
		attachments: data.attachments ? {
			connect: data.attachments.map(({ id }) => ({ id })),
			create: data.attachments.map((el) => createAttachmentInput(el))
		} : undefined,
		content: data.content
	}
}

const optionalSchema = schema.deepPartial();
export const updatePostInput = (data: z.infer<typeof optionalSchema>): Prisma.PostUpdateInput => {
	return {
		attachments: data.attachments ? {
			connect: data.attachments
				.filter(({ id }) => (id))
				.map(({ id }) => ({ id: id! })),
			create: data.attachments
				.filter(({ fileURL }) => (fileURL))
				.map(({ fileURL }) => createAttachmentInput({ fileURL: fileURL! }))
		} : undefined,
		content: data.content
	}
}