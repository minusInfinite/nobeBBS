import bcrypt from "bcrypt";
import prisma from "../config/connection";

export default class User {
    #db = prisma

    constructor() {
        this.db = this.#db
    }

    async create(data) {
        const passwordHash = await bcrypt.hash(data.password, 10)
        data.password = passwordHash
        return await this.db.user.create(data)
    }

    async findById(id) {
        return await this.db.user.findUnique({ where: { id } })
    }
}

