
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const CategoryRouter = require('./routers/category');
const ColorRouter = require('./routers/color');
const ProductRouter = require('./routers/product');
const UserRouter = require('./routers/user');
const CartRouter = require('./routers/cart');
const OrderRouter = require('./routers/order');
const MediRouter = require('./routers/MediRouter');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("public"));
app.use("/category", CategoryRouter);
app.use("/color", ColorRouter);
app.use("/product", ProductRouter);
app.use("/user", UserRouter);
app.use("/cart", CartRouter);
app.use("/order", OrderRouter);
app.use("/api", MediRouter);



mongoose.connect(
    "mongodb://localhost:27017",
    {
        dbName: "med",
    }
).then(
    (success) => {
        console.log("connected to db"),
            app.listen(5000, () => {
                console.log('App listen on port 5000');
            });
    }
).catch(
    (error) => {
        console.log("Unable to connect to db")
    }
)