import express from "express"

const app = express();


const dns = require("dns")
console.log(dns.getServers());
dns.setServers(["8.8.8.8", "8.8.4.4"]);


app.use(express.json())



export {app}