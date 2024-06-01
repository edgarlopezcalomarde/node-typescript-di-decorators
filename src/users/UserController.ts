import { Controller, Get } from "@lib/Controller";
import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import { GetAllUserService } from "./GetAllUserService";



@Controller("/api/users")
@autoInjectable()
export class UserController {
    constructor(private getAllUsersService?: GetAllUserService) { }

    @Get("/")
    async getAll(req: Request, res: Response) {
        const data = await this.getAllUsersService?.execute();
        res.json({ data })
    }

}

export default UserController