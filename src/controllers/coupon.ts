import { Request, Response } from "express";
export class CouponControllers {
    static async getCoupons(req: Request, res: Response) {
        return res.send({
            success: true,
            message: "35$ discount coupon"
        })
    }
}