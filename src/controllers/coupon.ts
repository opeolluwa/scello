import { Request, Response } from "express";
import { Product, ProductInterface } from "../model";
export class CouponControllers {
    static async getCoupons(req: Request, res: Response) {
        //retrieve coupon code 
        const { couponCode: coupon } = req.body;
        if (!coupon) {
            return res.status(400).send({
                success: false,
                message: "Invalid request, Expected coupon code but got an empty string"
            })
        }


        const couponCode = String(coupon).toUpperCase();
        //retrieve product's total price
        let products = await Product.findAll(
            { attributes: ["productName", "productPrice", "productDescription"] }
        );


        let amountPayable = 0;
        for (const price in products) {
            amountPayable += Number(products[price].productPrice);
        }

        //validate the token
        switch (couponCode) {
            /**
             * - cart total price must be greater than $1000 before discounts
             * $10 off total (fixed amount off)
             * %10 off total (percent off)
             */
            case "REJECTED10":
                {
                    if (amountPayable > 1000) {
                        //calculate the discounted amount
                        const fixedDiscount = amountPayable - 10;
                        const discountedAmount = Math.round(amountPayable - (fixedDiscount + (0.1 * amountPayable)));
                        return res.send({
                            success: true,
                            message: "You have been successfully discounted by $10",
                            initialAmount: amountPayable,
                            discountedAmount: amountPayable - discountedAmount,
                            discount: discountedAmount
                        })
                    }
                }
                break;

            /***
             * cart total price must be greater than $200 before discounts
             * cart must contain at least 3 items
             * %10 or $10 (whichever is greatest)
             */
            case "MIXED10":
                {
                    if ((amountPayable > 200) && (products.length >= 3)) {
                        //calculate the discounted amount
                        const discount = ((0.1 * amountPayable) > (amountPayable - 10)) ? (0.1 * amountPayable) : (amountPayable - 10);
                        const discountedAmount = Math.round(amountPayable - discount)
                        return res.send({
                            success: true,
                            message: `You have been successfully discounted by $${discount}`,
                            initialAmount: amountPayable,
                            discountedAmount,
                            discount: Math.round(discount),
                        })
                    }
                }
                break;

            /**
             * cart total price must be greater than $100 before discounts
             * cart must contain at least 2 items
             * %10 off total (percent off)
             */
            case "PERCENT10":
                {
                    if ((amountPayable > 100) && (products.length >= 2)) {
                        //calculate the discounted amount
                        const discount = (0.1 * amountPayable);
                        const discountedAmount = Math.round(amountPayable - discount)
                        return res.send({
                            success: true,
                            message: `You have been successfully discounted by $${discount}`,
                            initialAmount: amountPayable,
                            discountedAmount,
                            discount: Math.round(discount),
                        })
                    }
                }
                break;

            case "FIXED10":
                {
                    if ((amountPayable > 50) && (products.length >= 1)) {
                        //calculate the discounted amount
                        const discount = (amountPayable - 10);
                        const discountedAmount = Math.round(amountPayable - discount)
                        return res.send({
                            success: true,
                            message: `You have been successfully discounted by $${discount}`,
                            initialAmount: amountPayable,
                            discountedAmount,
                            discount: Math.round(discount),
                        })

                    }
                }
                break;
            default:
                {
                    return res.send({
                        success: false,
                        message: "you are not eligible for this discount",
                    })
                }
                break;
        }
    }
}