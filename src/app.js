import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import colors from "colors";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

// import routes
import usersRouter from "./routes/users.js";
import productsRouter from "./routes/products.js";
import salesRouter from "./routes/sales.js";
import categoriesRouter from "./routes/categories.js";
import clientsRouter from "./routes/clients.js";
import profilesRouter from "./routes/profiles.js";
import saleDetailsRouter from "./routes/saleDetails.js";
import debtsRouter from "./routes/debts.js";

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

app.use(cookieParser());
// app.use(
//   cors({ origin: [`https://budget-app-rouge.vercel.app`], credentials: true })
// );
app.use(cors({ origin: [`http://localhost:5173`], credentials: true }));
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       const ACCEPTED_ORIGINS = ["https://budget-app-rouge.vercel.app"];

//       if (ACCEPTED_ORIGINS.includes(origin)) {
//         return callback(null, true);
//       }

//       if (!origin) {
//         return callback(null, true);
//       }
//     },
//   })
// );

// para capturar el body
// json middleware
// app.use(express.json()); -> una opción sin body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("tiny"));

// route middleware
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/sales", salesRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/clients", clientsRouter);
app.use("/api/v1/profiles", profilesRouter);
app.use("/api/v1/saleDetails", saleDetailsRouter);
app.use("/api/v1/debts", debtsRouter);

// app server listening
const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(colors.rainbow(`Server is running on port ${PORT}`))
);

export default app;
