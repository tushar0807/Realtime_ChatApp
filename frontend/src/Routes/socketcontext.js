import { io } from "socket.io-client";
import  React , {createContext } from "react";
const SocketContext = createContext();
const SocketProvider = ({ children }) => {

    const socket = io.connect("http://localhost:5000");
    
    return (
      <SocketContext.Provider value={socket}>
        {children}
      </SocketContext.Provider>
    );
    };
export  {SocketProvider, SocketContext};
