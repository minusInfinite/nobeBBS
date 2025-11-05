import prisma from "../config/connection";

export default class Post {
    #db = prisma

    constructor() {
        this.db = this.#db
    }

    async create(data) {
        return await this.db.post.create(data)
    }

    async findInTopic(topicId) {
        try {

        } catch (error) {

        }

    }
}


