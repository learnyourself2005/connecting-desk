import express from 'express';
import dotenv from 'dotenv";'

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

console.log(process.env.PORT);

app.get("/api/auth/signup", (req, res) => { res.send("signup endpoint") });
app.get("/api/auth/login", (req, res) => { res.send("Login endpoint") });
app.get("/api/auth/logout", (req, res) => { res.send("Logout endpoint") });
app.listen(3000, () => console.log("server running on port " + PORt));