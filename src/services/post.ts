import prisma, { Prisma } from "../config/prisma";
import { z } from "zod";

import schema from "../schemas/database/post";
import { createPostInput, updatePostInput } from "../maps/post";


export const getFirstPost = async (id: string) => {
	return await prisma.post.findFirst({ where: { id } });
}

export const createPost = async (data: z.infer<typeof schema>) => {
	return await prisma.post.create({
		data: createPostInput(data)
	});
}

export const updatePost = async (id: string, data: z.infer<typeof schema>) => {
	type a = Prisma.AttachmentUpdateManyWithoutPostNestedInput
	return await prisma.post.update({
		where: { id },
		data: updatePostInput(data)
	});
}

export const deletePost = async (id: string) => {
	return await prisma.post.delete({
		where: { id }
	});
}