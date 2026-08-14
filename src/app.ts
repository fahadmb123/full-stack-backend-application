import express from "express"
import userRoute from "./routes/userRoutes"
import adminRoute from "./routes/adminRoutes"
import errorMiddleware from "./middleware/errorMiddleware";
const app = express();


const dns = require("dns")
console.log(dns.getServers())
dns.setServers(["8.8.8.8", "8.8.4.4"])


app.use(express.json())

app.use("/api/auth",userRoute)
app.use("/api/admin",adminRoute)


app.use(errorMiddleware)
export {app}