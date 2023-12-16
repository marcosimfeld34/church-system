import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import colors from "colors";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import corsOptions from "./config/corsOptions.js";
import dotenv from "dotenv";
dotenv.config();

// import routes
import usersRouter from "./routes/users.js";
import productsRouter from "./routes/products.js";
import salesRouter from "./routes/sales.js";
import categoriesRouter from "./routes/categories.js";
import clientsRouter from "./routes/clients.js";
import saleDetailsRouter from "./routes/saleDetails.js";
import debtsRouter from "./routes/debts.js";

// middlewares
import credentials from "./middlewares/credentials.js";

// DB Connection
mongoose.set("strictQuery", false);
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.5pqkwyp.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection OK"))
  .catch((error) => console.log("error db: ", error));

// app instance
const app = express();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(morgan("tiny"));

// route middleware
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/sales", salesRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/clients", clientsRouter);
app.use("/api/v1/saleDetails", saleDetailsRouter);
app.use("/api/v1/debts", debtsRouter);

// app server listening
const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(colors.rainbow(`Server is running on port ${PORT}`))
);

export default app;
