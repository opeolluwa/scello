import { Request, Response } from "express";
import { Product, ProductInterface } from "../model";
interface ResponseInterface {
    success: boolean,
    message: string,
    discountedPrice: number,
    discount: number
    initialPrice: number,
}
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


        let totalPrice = 0;
        for (const price in products) {
            totalPrice += Number(products[price].productPrice);
        }

        let response = parseCoupon(couponCode, totalPrice, products.length);
        return res.send(response);
    }
}




function parseCoupon(couponCode: string, totalPrice: number, totalItems: number) {
    switch (couponCode) {
        /**
         * - cart total price must be greater than $1000 before discounts
         * $10 off total (fixed amount off)
         * %10 off total (percent off)
         */
        case "REJECTED10":
            {
                if (totalPrice > 1000) {
                    //calculate the discounted amount
                    const fixedDiscount = totalPrice - 10;
                    const percentageDiscount = ((totalPrice * 10) / 100).toFixed(2);
                    const discount = fixedDiscount + percentageDiscount;
                    const discountedPrice = totalPrice - Number(discount);
                    return {
                        success: true,
                        message: `You have been successfully discounted by ${discount}`,
                        initialPrice: totalPrice,
                        discountedPrice,
                        discount
                    }
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
                if ((totalPrice > 200) && (totalItems >= 3)) {
                    //calculate the discounted amount
                    const discount = ((0.1 * totalPrice) > (totalPrice - 10)) ? (0.1 * totalPrice) : (totalPrice - 10);
                    const discountedPrice = (totalPrice - discount).toFixed(2)
                    return {
                        success: true,
                        message: `You have been successfully discounted by $${discount}`,
                        initialPrice: totalPrice,
                        discountedPrice,
                        discount: (discount).toFixed(2),
                    }


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
                if ((totalPrice > 100) && (totalItems >= 2)) {
                    //calculate the discounted amount
                    const discount = (0.1 * totalPrice);
                    const discountedPrice = (totalPrice - discount).toFixed(2);
                    return {
                        success: true,
                        message: `You have been successfully discounted by $${discount}`,
                        initialPrice: totalPrice,
                        discountedPrice,
                        discount: discount.toFixed(2)
                    }

                }
            }
            break;

        case "FIXED10":
            {
                if ((totalPrice > 50) && (totalItems >= 1)) {
                    //calculate the discounted amount
                    const discount = (totalPrice - 10);
                    const discountedPrice = (totalPrice - discount).toFixed(2);
                    return {
                        success: true,
                        message: `You have been successfully discounted by $${discount}`,
                        initialPrice: totalPrice,
                        discountedPrice,
                        discount: (discount).toFixed(2),
                    }
                }
            }
            break;
        default:
            {
                return {
                    success: false,
                    message: "you are not eligible for any discount",
                    initialPrice: totalPrice,
                    discountedPrice: 0,
                    discount: 0,
                }


            }
            break;

    }
}





