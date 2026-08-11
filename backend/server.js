//load the the express library
const express = require("express");
const connectMongodb = require("./config/db");
const userRouter = require("./router/user");
const productsRouter = require("./router/product")
const CartRouter = require("./router/cart")
const OrderRouter = require("./router/order")
const userVerificationRouter = require("./router/userVerification");
const cors = require("cors");



const app = express();

connectMongodb();

//Middlewares: They are a series of fumctions may be forming a pipeline before reaches the actual route handler.

//Tells express to pass the incoming json bodies, without this the req.body will always be undefined
app.use(cors({
  origin: "http://localhost:5173",  // your React app's address
  credentials: true,                // allows cookies/auth headers
}));

app.use(express.json());    

app.use("/api/user", userRouter);

app.use("/api/user-verification", userVerificationRouter);

app.use("/api/products", productsRouter)

app.use("/api/cart", CartRouter)

app.use("/api/orders", OrderRouter);

app.listen(8000, ()=>{
    console.log("Server listening on port 8000")
})