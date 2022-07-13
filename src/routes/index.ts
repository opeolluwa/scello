import { Application } from "express";
import app from "..";

export default (app: Application) => {
    app.get("/cart", () => {
        console.log("cart");
    })
}