import { Request, Response } from "express";
import { ProductService } from "./ProductService";
import { autoInjectable } from "tsyringe";


@autoInjectable()
export class ProductController {

    constructor(private service?: ProductService) { }

    getAllProducts = async (req: Request, res: Response) => {
        const data = await this.service?.execute();
        res.json({ data })
    }

}