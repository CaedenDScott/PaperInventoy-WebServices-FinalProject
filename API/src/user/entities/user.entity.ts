import { Entity, PrimaryKey } from "@mikro-orm/core";
import * as crypto from "crypto"

@Entity()
export class User {
    @PrimaryKey()
    apiKey: string = crypto.randomBytes(32).toString("hex")
}
