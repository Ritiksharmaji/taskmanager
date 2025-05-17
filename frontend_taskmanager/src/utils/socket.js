// utils/socket.js
import { io } from "socket.io-client";

const API_URL = "https://taskmanager-phi-six.vercel.app/api"; 
const socket = io(API_URL); 

export default socket;
