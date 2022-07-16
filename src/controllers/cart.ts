import { Request, Response } from "express";
import { Product, ProductInterface } from "../model";
export class CartControllers {
    static async getCartContent(req: Request, res: Response) {
        //retrieve products
        let products = await Product.findAll(
            { attributes: ["productName", "productPrice", "productDescription"] }
        );

        //calculate the total price
        let amountPayable = 0;
        for (const price in products) {
            amountPayable += Number(products[price].productPrice);
        }

        //parse the response as human readable JSON
        products = products.map((product: ProductInterface) => {
            return {
                productName: product.productName,
                productPrice: `$${product.productPrice}`,
                productDescription: product.productDescription,
            }
        })

        return res.send({
            totalPrice: amountPayable,
            currency: "USD",
            products

        })
    }
}