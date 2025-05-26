import prisma from "../config/prisma";
import { createAttachmentInput, updateAttachmentInput } from "../maps/attachment";
import { createPostInput, updatePostInput } from "../maps/post";

import { createTaskInput, updateTaskInput } from "../maps/task";
import type { taskCreateType, taskUpdateType } from "../schemas/database/task";

const selectFields = {
	post: true,
	socials: true,
	post_timestamp: true
};


export const getTasks = async () => {
	return await prisma.task.findMany();
}

export const getFirstTask = async (id: string) => {
	return await prisma.task.findFirst({
		where: { id },
		select: selectFields
	});
}

export const createTask = async (data: taskCreateType) => {
	return await prisma.task.create({
		data: createTaskInput(data),
		select: {
			id: true,
			...selectFields
		}
	})
}

export const updateTask = async (id: string, data: taskUpdateType) => {
	const promiseTasks: Promise<any>[] = [];
	const { post } = data;

	if (post) {
		if ('id' in post) {
			promiseTasks.push(
				prisma.post.update({
					where: { id: post.id },
					data: updatePostInput(post),
					select: { id: true }
				})
			)

			const { attachments } = post;

			if (attachments) {
				for (const el of attachments) {
					if ('id' in el) {
						promiseTasks.push(
							prisma.attachment.update({
								where: { id: el.id },
								data: updateAttachmentInput(el),
								select: { id: true }
							})
						)
					} else {
						promiseTasks.push(
							prisma.attachment.create({
								data: createAttachmentInput(el),
								select: { id: true }
							})
						)
					}
				}
			}

		} else {
			promiseTasks.push(
				prisma.post.create({
					data: createPostInput(post),
					select: { id: true }
				})
			)
		}
	}

	await Promise.all([
		prisma.task.update({
			where: { id },
			data: updateTaskInput(data),
			select: selectFields
		}),
		...promiseTasks
	]);

	return await prisma.task.findFirst({
		where: { id },
		select: selectFields
	});
}

export const deleteTask = async (id: string) => {
	return await prisma.task.delete({
		where: { id },
		select: { id: true }
	})
}
