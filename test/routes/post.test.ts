import { AttachmentType, PostType } from "@prisma/client"
import env from "../../src/config/env"


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

function checkObj(
	objOne: Record<string, any>,
	objTwo: Record<string, any>
) {
	const one = (key: string) => JSON.stringify(objOne[key]);
	const two = (key: string) => JSON.stringify(objTwo[key]);

	for (const key in objOne) {
		expect(one(key)).toBe(two(key));
	}

	for (const key in objTwo) {
		expect(two(key)).toBe(one(key));
	}
}



describe("Route Posts", () => {
	const context = {} as {
		attachment: {
			id: string,
			path: "/Test/Purposes",
			type: 'Local'
		}
	};

	beforeEach(async () => {
		const resJson: { id: string, path: "/Test/Purposes", type: 'Local' } = await (await fetch(`${config.url}/attachment`, {
			...options,
			method: methods.POST,
			body: JSON.stringify({
				'path': "/Test/Purposes",
				'type': AttachmentType.Local
			})
		})).json();

		context.attachment = resJson;
	})

	const posts = new Promise<{
		id: string
		content: string
		attachments: any
		type: string
	}[]>((resolve) => {
		it("Create Post", async () => {
			const postsTypes = [
				PostType.Default,
				PostType.Draft,
				PostType.Suggestion
			]
			.map(async (type) => {
				const response = fetch(`${config.url}/post`, {
					...options,
					method: methods.POST,
					body: JSON.stringify({
						'content': `Some Content For Testing (${type})`,
						'attachments': [
							{ 'id': context.attachment.id }
						],
						'type': type
					})
				});

				expect((await response).ok).toBeTruthy();
				expect((await response).status).toBe(201);

				const resJson: Promise<{
					id: string,
					content: string,
					attachments: any,
					type: string
				}> = (await response).json();

				checkPropertys(await resJson, ['id', 'content', 'attachments', 'type']);
				checkObj(await resJson, {
					'id': (await resJson).id,
					'content': `Some Content For Testing (${type})`,
					'attachments': [
						{
							'path': context.attachment.path,
							'type': context.attachment.type
						}
					],
					'type': type
				})

				return (await resJson);
			})

			resolve(await Promise.all(postsTypes));
		})
	})

	new Promise((resolve) => {
		it("Get Post", async () => {
			(await posts).map(async () => {

			})
		})
	})

	it("Delete Posts", async () => {
		(await posts).map(async (post) => {
			const response = fetch(`${config.url}/post/${post.id}`, {
				...options,
				method: methods.DELETE
			});

			expect((await response).ok).toBeTruthy();
			expect((await response).status).toBe(200);

			const resJson: Promise<{ id: string }> = (await response).json();

			expect((await resJson)).toHaveProperty('id');
			expect((await resJson).id).toBe(post.id);
		})
	})

	afterEach(async () => {
		await fetch(`${config.url}/attachment/${context.attachment.id}`, {
			...options,
			method: methods.DELETE
		})
	})
})