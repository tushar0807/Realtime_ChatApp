const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io");
app.use(cors());

const server = http.createServer(app);
var arrayid = [];
const io = new Server(server,{
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET","POST"],
    },
})

io.on("connection", (socket) => {
 console.log(`A user is connected ${socket.id}`);
    socket.on("joinroom",(data) =>{
        const index = arrayid.findIndex((element) =>{ return element == data});
        var tempmessage = "";
        if(index == -1){ // room id pehle nhi thi so we created
            tempmessage = "new room is created";
        }else{
            tempmessage = "you are joined in existing room"
        } // room is joined by you
        
        arrayid = [...arrayid ,data];
        socket.join(data);
        console.log(`user with id: ${socket.id} joined the room: ${data}`);
        socket.emit("validation",tempmessage);
    })

    socket.on("sendmessage",(data)=>{
        console.log(data);
        io.sockets.to(data.room).emit("reciever",data);
    })

    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id);
    })
});

const port = 5000;

server.listen(port,()=>{
    console.log(`server is connected on ${port}`);
})
