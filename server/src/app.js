import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin:[
            'https://zoroz-suthakar-anburajs-projects.vercel.app',
        'https://zoroz-grxbla0jz-suthakar-anburajs-projects.vercel.app',
        'https://zoroz-ten.vercel.app'
    ],
    credentials: true
}));

app.use(express.json({limit: "1mb"}));
app.use(express.urlencoded({extended: true, limit: "1mb"}));
app.use(express.static("public"));
app.use(cookieParser());


//routes import
import userRouter from './routes/user.routes.js';
import cartRouter from './routes/cart.routes.js';
import paymentRouter from './routes/payment.routes.js';
import orderRouter from './routes/order.routes.js';

//routes declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/cart",cartRouter)
app.use("/api/v1/payment",paymentRouter)
app.use("/api/v1/order",orderRouter)

// http://localhost:8000/api/v1/users/register

export { app }
