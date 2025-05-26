import prisma from "../config/prisma";

import { updateAttachment } from "./attachment";
import { createPostInput, updatePostInput } from "../maps/post";
import type { postCreateType, postUpdateType } from "../schemas/database/post";
import { attachmentUpdateType } from "../schemas/database/attachment";
import { createAttachmentInput, updateAttachmentInput } from "../maps/attachment";

const selectFields = {
	content: true,
	type: true,
	attachments: {
		select: {
			path: true,
			type: true
		}
	}
}


export const getFirstPost = async (id: string) => {
	return await prisma.post.findFirst({
		where: { id },
		select: selectFields
	});
}

export const createPost = async (data: postCreateType) => {
	return await prisma.post.create({
		data: createPostInput(data),
		select: {
			id: true,
			...selectFields
		}
	});
}

export const updatePost = async (id: string, data: postUpdateType) => {
	const promiseAttachmens: Promise<any>[] = [];
	const { attachments } = data;

	if (attachments) {
		for (const el of attachments) {
			if ('id' in el) {
				promiseAttachmens.push(
					prisma.attachment.update({
						where: { id: el.id },
						data: updateAttachmentInput(el),
						select: { id: true }
					})
				)
			} else {
				promiseAttachmens.push(
					prisma.attachment.create({
						data: createAttachmentInput(el),
						select: { id: true }
					})
				)
			}
		}
	}

	await Promise.all([
		prisma.post.update({
			where: { id },
			data: updatePostInput(data),
			select: { id: true }
		}),
		...promiseAttachmens
	])

	return await getFirstPost(id);
}

export const deletePost = async (id: string) => {
	return await prisma.post.delete({
		where: { id },
		select: { id: true }
	});
}