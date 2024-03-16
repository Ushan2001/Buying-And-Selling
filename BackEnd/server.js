const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express();

/* Ushan Mihiranga (Supplier Management) */
const supplierRouter = require("./routes/suppliers")
const userRouter = require("./routes/Users")
const newUserRouter = require("./routes/NewUsers")

/* Lashini Jayasooriya (Order Management) */
const orderRouter = require("./routes/orders")

/* Rashmika Nimesh (Product Management) */
const productRouter = require("./routes/products")

/* Rashini Weerawardane (Customer Management) */
const customerRouter = require("./routes/customers")

/* Samadhi Jayasooriya (Transaction History) */
const historyRouter = require("./routes/history")

/* Haritha Lidapitiya (Report Genaration) */
const discountRouter = require("./routes/discount")

/* Dulaj Indula (Payment Management) */
const paymentRouter = require("./routes/payments")

/* Ridmi Ranashinha (Delivery Management) */
const deliveryRouter = require("./routes/delivery")



app.use(bodyParser.json())  
app.use(cors())

/* Ushan Mihiranga (Supplier Management) */
app.use(supplierRouter)
app.use(userRouter)
app.use(newUserRouter)

/* Lashini Jayasooriya (Order Management) */
app.use(orderRouter)

/* Rashmika Nimesh (Inventory Management) */
app.use(productRouter)
app.use('/uploads', express.static('uploads'));

/* Rashini Weerawardane (Customer Management) */
app.use(customerRouter)

/* Samadhi Jayasooriya (Transaction History) */
app.use(historyRouter)

/* Haritha Lidapitiya (Report Genaration) */
app.use(discountRouter)

/* Dulaj Indula (Payment Management) */
app.use(paymentRouter)

/* Ridmi Ranashinha (Delivery Management) */
app.use(deliveryRouter)


const PORT = 8070;
const URL = "mongodb+srv://ushan:ushan2001@ushan.w9ekg7n.mongodb.net/supplier?retryWrites=true&w=majority"

mongoose.connect(URL,{ useUnifiedTopology: true, useNewUrlParser: true })


.then(() =>{
    console.log("BuySell Nexus Database Connected 😌")
})
.catch((err) =>console.log("DB Connection Error", err))

app.listen(PORT, () =>{
    console.log("App is running on -->  ",PORT)  
})