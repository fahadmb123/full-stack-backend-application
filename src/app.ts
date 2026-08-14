import express from "express"
import userRoute from "./routes/userRoutes"
import cookieParser from "cookie-parser";

const app = express();


const dns = require("dns")
console.log(dns.getServers());
dns.setServers(["8.8.8.8", "8.8.4.4"]);


app.use(express.json())
app.use(cookieParser());

app.use("/api/auth",userRoute)


export {app}