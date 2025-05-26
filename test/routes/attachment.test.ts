import { AttachmentType } from "@prisma/client";
import env from "../../src/config/env";


// CONSTS
const config = {
	url: `http://localhost:${env.port}/api`
}

const options = {
	headers: {'Content-Type': 'application/json'}
}

const methods = {
	GET: 'GET',
	HEAD: 'HEAD',
	OPTIONS: 'OPTIONS',
	TRACE: 'TRACE',
	PUT: 'PUT',
	DELETE: 'DELETE',
	POST: 'POST',
	PATCH: 'PATCH',
	CONNECT: 'CONNECT'
}


function checkPropertys(obj: any, propertys: string[]) {
	for (const prop of propertys) {
		expect(obj).toHaveProperty(prop);
	}
}

describe('Route Attachments', () => {
	type baseJson = {
		id: string
    path: string
    type: string
	}

	const attachmentVariants = [
		{
			'path': "/path/to/local/path",
			'type': AttachmentType.Local
		},
		{
			'path': "http://path.to/External/path",
			'type': AttachmentType.External
		}
	]

	const attachments = new Promise<baseJson[]>(async (resolve) => {
		it('Create Atachment', async () => {
			const temp = [] as baseJson[];

			attachmentVariants.forEach(async (variant) => {
				const response = fetch(`${config.url}/attachment`, {
					...options,
					method: methods.POST,
					body: JSON.stringify(variant)
				})
			
				const resJson: Promise<baseJson> = (await response).json();
	
				expect((await response).ok).toBeTruthy();
				expect((await response).status).toBe(201);
	
				checkPropertys(await resJson, ['id','path','type']);
				expect((await resJson).path).toBe(variant.path);
				expect((await resJson).type).toBe(variant.type);
	
				temp.push(await	resJson);
			})

			resolve(temp);
		})
	})

	const allAttachments = new Promise<baseJson[]>((resolve) => {
		it('Get Attachment', async () => {
			(await attachments).map(async (attachment) => {
				const response = fetch(`${config.url}/attachment/${attachment.id}`, options);
	
				expect((await response).ok).toBeTruthy();
				expect((await response).status).toBe(200);
	
				const resJson: Promise<Omit<baseJson, 'id'>> = (await response).json();
	
				checkPropertys(await resJson, ['path','type']);
				expect((await resJson).path).toBe(attachment.path);
				expect((await resJson).type).toBe(attachment.type);

				return (await resJson);
			})

			resolve(Promise.all(await attachments));
		})
	})

	const isComplete = new Promise<void>((resolve) => {
		it('Get All Attachments', async () => {
			await allAttachments;

			const response = fetch(`${config.url}/attachment`, {
				...options,
				method: methods.GET
			});

			expect((await response).ok).toBeTruthy();
			expect((await response).status).toBe(200);

			const resJson: Promise<baseJson[]> = (await response).json();

			for (const item of (await resJson)) {
				checkPropertys(item, ['id', 'path', 'type']);
				expect(item.type).toMatch(/(External)|(Local)/gm);
			}

			resolve();
		})
	})

	it('Delete Attachment', async () => {
		await isComplete;

		(await attachments).map(async (attachment) => {
			const response = fetch(`${config.url}/attachment/${attachment.id}`, {
				...options,
				method: methods.DELETE
			})

			expect((await response).ok).toBeTruthy();
			expect((await response).status).toBe(200);

			const resJson: Promise<{ id: string }> = (await response).json();

			expect((await resJson)).toHaveProperty('id');
			expect((await resJson).id).toBe(attachment.id);
		})
	})
})