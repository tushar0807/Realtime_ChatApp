import React from 'react'
import { useContext,useState } from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import {Route , Routes, BrowserRouter} from 'react-router-dom';
import { SocketContext } from './socketcontext';

function Home() {
    const socket = useContext(SocketContext);
    const [room , setroom] = useState("");
    const [Username , setUsername] = useState("");
    const navigate = useNavigate();

  const joinroom = () =>{
      if(Username !== "" && room !== ""){
      socket.emit("joinroom",room);
      socket.on("validation",(data)=>{
      alert(`console says: ${data}`);
      const states = {
        rooms : room,
        username : Username,
      }
      navigate("/chats", {state: states});
      });
      }else{
        alert("Enter Valid Inputs");
      }
   }
  return (
    <div className="App-header">
        <div>
        <h1>hello world</h1>
        <h3>JOIN A CHAT</h3>
         <label htmlFor={'my-input'}> Enter roomid: </label>
         <input 
         type='text' 
         placeholder='Enter roomid...'
         onChange={(event)=>{
          setroom(event.target.value);
         }}
         />
         <label htmlFor={'my-input'}> Enter username: </label>
         <input type='text' 
         placeholder='john...' 
         onChange={(event) =>{
            setUsername(event.target.value);
         }}
         />
        <button onClick ={joinroom}><h3>CreateRoom/Joinroom</h3></button>
        </div>

      </div>
  
)}

export default Home