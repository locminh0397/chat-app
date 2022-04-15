import { io } from "socket.io-client";
import React from "react";
const SOCKET_URL = "https://api-chatapp0315.herokuapp.com";
export const socket = io(SOCKET_URL);
export const AppContext = React.createContext();
