import Booru, { Post, sites } from 'booru';


class BooruService {
	private BooruApp;

	constructor(site: keyof typeof sites) {
		this.BooruApp = Booru(site);
	}

	async getPost(id: string | number): Promise<Post | null> {
		const res = await fetch(this.getPostURL(id));

		try {
			return await res.json();
		} catch (e) {
			return null;
		}
	}

	async getRandom(tags: string | string[] = []) {
		return await this.BooruApp.search(tags, { random: true });
	}

	private getPostURL(id: string | number) {
		const { site } = this.BooruApp;
		return `https://${site.domain}${site.api.search}id=${id}`;
	}
}


const booru = new BooruService('safebooru.org');
export default booru;
