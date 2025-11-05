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

    async getRole(id) {
        return await this.db.user.findUnique({
            where: { id: id },
            select: {
                id: true,
                isAdmin: true
            }
        })
    }

    async validatePassword(passString, passhash) {
        return await bcrypt.compare(passString, passhash)
    }

    async save(data) {
        return await this.db.user.update({
            where: {
                id: data.id
            },
            data: data
        })
    }

    async logOut(id) {
        await this.db.user.update({
            where: { id: id },
            data: {
                lastLogin: new Date().toISOString()
            }
        })

    }
}

