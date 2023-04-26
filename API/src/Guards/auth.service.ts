import { EntityManager } from "@mikro-orm/mysql";
import { Injectable } from "@nestjs/common";
import { Request } from "express"
import { User } from "src/user/entities/user.entity";


@Injectable()
export default class GuardService {
    constructor(private readonly em: EntityManager) { }
    async ValidateRequest(request: Request): Promise<boolean> {
        const apiKey = request.header('apiKey')
        if (!apiKey) {
            return false
        } else {
            try {
            const result = await this.em.findOneOrFail(User, { apiKey })
            return true
            } catch (error) {
                return false
            }
        }
    }
}