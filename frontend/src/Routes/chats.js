import React, { useEffect ,useContext} from 'react'
import { useState } from 'react'
import { SocketContext } from './socketcontext';
import { useLocation } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';
import "./chats.css";

 function Chats(){
    const [currmessage , setcurrmessage] = useState("");
    const [msgList , setMsgList] = useState([]);
    const socket = useContext(SocketContext);
    const location = useLocation();
    const rooms = location.state.rooms;
    const username = location.state.username;

   const sendmessage = async ()=>{
      if(currmessage !== ""){
         const messagedata = {
               room: rooms,
               author: username,
               message: currmessage,
               time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
         }
            await socket.emit("sendmessage", messagedata);
            setcurrmessage("");
      }
   }

   useEffect(()=>{
      socket.on("reciever",(data)=>{
         // if(data.author !== username){
         //    console.log(data);
         // }
         setMsgList((list)=> [...list,data]);
      })
      return ()=>{
         socket.off("reciever");
      }
   },[socket]);
   return(
      <div className='chat-window'>
      <div className='chat-header'><p>Live chats</p></div>
      <div className='chat-body'>
         <ScrollToBottom className= "message-container">{
         msgList.map( (msgcontent) => {
            return (
            <div className='message' id = {username === msgcontent.author ? "you" : "other"}>
               <div>
               <div className='message-content'>
                  <p>{msgcontent.message}</p>
               </div>
               <div className='message-meta'>
                  <p id='time'>{msgcontent.time}</p>
                  <p id='author'>{msgcontent.author}</p>
               </div>
               </div>
            </div>)
         })}
         </ScrollToBottom>
      </div>
      <div className='chat-footer'>
      <input type = 'text'
      value={currmessage}
      placeholder='type to send message...'
      onChange={(event)=>{
         setcurrmessage(event.target.value);
      }}
      onKeyPress={(event)=>{ if(event.key === "Enter"){ sendmessage();}}}
      />
      <button onClick={sendmessage}>SEND</button>
      </div>
      </div>
   )
}

export default Chats