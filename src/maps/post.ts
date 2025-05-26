import { Prisma } from "../config/prisma";

import { createAttachmentInput, updateAttachmentInput } from "./attachment";
import type { postCreateType, postUpdateType } from "../schemas/database/post";
import type { attachmentCreateType, attachmentConnectType, attachmentUpdateType } from "../schemas/database/attachment";
import logger from "../shared/logger";


function filter(obj: any, fields: any[], extraCondition: boolean = false): boolean {
if (Object.keys(obj).length === fields.length || extraCondition) {
		for (const field of fields)
			if (!(field in obj))
				return false;
		return true;
	}
	return false;
}


export const createPostInput = (data: postCreateType): Prisma.PostCreateInput => {
	return {
		...data,
		attachments: {
			create: data.attachments
				.filter((el): el is attachmentCreateType => filter(el, ['path', 'type']))
				.map((el) => createAttachmentInput(el)),
			connect: data.attachments
				.filter((el): el is attachmentConnectType => filter(el, ['id']))
				.map((el) => ({ id: el.id }))
		}
	}
}

export const updatePostInput = (data: postUpdateType): Prisma.PostUpdateInput => {
	return {
		...data,
		attachments: {
			create: data.attachments ?
				data.attachments
					.filter((el): el is attachmentCreateType => filter(el, ['path', 'type']))
					.map((el) => createAttachmentInput(el))
				: undefined,
			connect: data.attachments ?
				data.attachments
					.filter((el): el is attachmentConnectType => filter(el, ['id']))
					.map((el) => ({ id: el.id }))
				: undefined,
		// 	update: data.attachments ?
		// 		data.attachments
		// 			.filter((el): el is attachmentUpdateType => filter(el, ['id'], Object.keys(el).length > 1))
		// 			.map((el) => el)
		// 		: undefined,
		}
	}
}