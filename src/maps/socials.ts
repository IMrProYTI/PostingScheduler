import { Prisma } from "../config/prisma";

import type { socialCreateType, socialUpdateType } from "../schemas/database/social";


export const createSocialInput = (data: socialCreateType): Prisma.SocialCreateInput => {
	return { ...data }
}

export const updateSocialInput = (data: socialUpdateType): Prisma.SocialUpdateInput => {
	return { ...data }
}