    const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes.js")
const messageRoutes = require("./routes/messageRoutes.js")

const app = express();
const socket = require("socket.io");

require("dotenv").config();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/api/auth',userRoutes)
app.use('/api/messages',messageRoutes)

mongoose.connect(process.env.MONGO_URL,{ 
}).then(()=>{
    console.log(`DB connection successful`);
}).catch((err)=>{
    console.log(`DB connection failed`, err);
})


const server = app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

const io = socket(server,{
    cors:{
        origin: "http://localhost:5173",
        credentials: true,
    }
})

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        console.log(`User ${userId} connected with socket ID: ${socket.id}`);
        onlineUsers.set(userId, socket.id);
        console.log("Current online users:", Array.from(onlineUsers.entries()));
    });
    socket.on("send-msg", (data) => {
        console.log("Received 'send-msg' event with data:", data);
        const recipientSocketId = global.onlineUsers.get(data.to);  // Get recipient's socket ID
        if (recipientSocketId) {
            console.log(`Sending message to ${data.to} with message: ${data.message}`);
            socket.to(recipientSocketId).emit("msg-receive", data.message);  // Send message to recipient
        } else {
            console.log(`User ${data.to} is offline`);
        }
    });

})

// https://chatgpt.com/share/670a47ae-8224-800a-b811-1080890e7f1d