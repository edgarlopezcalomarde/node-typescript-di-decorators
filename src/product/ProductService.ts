import { autoInjectable } from "tsyringe";
import { ProductRepository } from "./ProductRepository";


@autoInjectable()
export class ProductService {

    constructor(private repo?: ProductRepository) { }


    async execute() {
        return await this.repo?.getAll();
    }
}