import { Request, Response } from "express";
import { Product } from "../model";
export class CartControllers {
    static async getCartContent(req: Request, res: Response) {
        const product = await Product.create({
            productName: "Milk",
            productPrice: 10,
            productDescription: "This is a milk",
        });

        const products = await Product.findAll();
        return res.send({
            success: true,
            message: "35$ discount coupon",
            payload: {
                totalPayable: 695,
                currency: "USD",
                products

            }
        })
    }
}