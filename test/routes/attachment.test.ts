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

	const createdAttachments = [] as Promise<baseJson>[];

	it('Create Attachment', async () => {
		[
			{
				'path': "/path/to/local/path",
				'type': AttachmentType.Local
			},
			{
				'path': "http://path.to/External/path",
				'type': AttachmentType.External
			}
		]
		.map(async (body) => {
			const response = fetch(`${config.url}/attachment`, {
				...options,
				method: methods.POST,
				body: JSON.stringify(body)
			})
			
			const resJson: Promise<baseJson> = (await response).json();
			
			createdAttachments.push(resJson);

			expect((await response).ok).toBeTruthy();
			expect((await response).status).toBe(201);

			checkPropertys(await resJson, ['id','path','type']);
			expect((await resJson).path).toBe(body.path);
			expect((await resJson).type).toBe(body.type);
		})
	})

	it('Get Attachment', async () => {
		createdAttachments.map(async (attachment) => {
			const response = fetch(`${config.url}/attachment/${(await attachment).id}`, options);

			expect((await response).ok).toBeTruthy();
			expect((await response).status).toBe(200);

			const resJson: Promise<Omit<baseJson, 'id'>> = (await response).json();

			checkPropertys(await resJson, ['path','type']);
			expect((await resJson).path).toBe((await attachment).path);
			expect((await resJson).type).toBe((await attachment).type);
		})
	})

	const isComplete = new Promise<void>((resolve) => {
		it('Get All Attachments', async () => {
			await Promise.all(createdAttachments);

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

		createdAttachments.map(async (attachment) => {
			const response = fetch(`${config.url}/attachment/${(await attachment).id}`, {
				...options,
				method: methods.DELETE
			})

			expect((await response).ok).toBeTruthy();
			expect((await response).status).toBe(200);

			const resJson: Promise<{ id: string }> = (await response).json();

			resJson.then((value) => console.log(JSON.stringify(value)));

			expect((await resJson)).toHaveProperty('id');
			expect((await resJson).id).toBe((await attachment).id);
		})
	})
})