import prisma from "../config/prisma";

import { attachmentCreateType, attachmentUpdateType } from "../schemas/database/attachment";
import { createAttachmentInput, updateAttachmentInput } from "../maps/attachment";

const selectFields = {
	path: true,
	type: true
}


export const getAllAttachments = async () => {
	return await prisma.attachment.findMany({
		select: {
			id: true,
			...selectFields
		}
	});
}

export const getFirstAttachment = async (id: string) => {
	return await prisma.attachment.findFirst({
		where: { id },
		select: selectFields
	});
}

export const createAttachment = async (data: attachmentCreateType) => {
	return await prisma.attachment.create({
		data: createAttachmentInput(data),
		select: {
			id: true,
			...selectFields
		}
	});
}

export const updateAttachment = async (id: string, data: attachmentUpdateType) => {
	return await prisma.attachment.update({
		where: { id },
		data: updateAttachmentInput(data),
		select: selectFields
	});
}

export const deleteAttachment = async (id: string) => {
	return await prisma.attachment.delete({
		where: { id },
		select: { id: true }
	});
}