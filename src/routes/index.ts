import { Application } from "express";
import { CouponControllers } from "../controllers/coupon";
import { CartControllers } from "../controllers/cart";
export default (app: Application) => {
    app.get("/cart", CartControllers.getCartContent);
    app.post("/coupon", CouponControllers.getCoupons);
}