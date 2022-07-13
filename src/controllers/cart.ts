import { Request, Response } from "express";
export class CartControllers {
    static async getCartContent(req: Request, res: Response) {
        return res.send({
            success: true,
            message: "35$ discount coupon",
            payload: {
                totalPayable: 695,
                currency: "USD"

            }
        })
    }
}