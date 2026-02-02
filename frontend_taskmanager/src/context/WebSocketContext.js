// // React-related imports
// import React, { createContext, useContext, useEffect, useState } from 'react';
// // Import the Socket.IO client
// import { io } from 'socket.io-client';
// // Import your custom AuthContext to access the token
// import AuthContext from './AuthContext';

// // Create a new context to share the socket across the app
// const WebSocketContext = createContext();

// // Context Provider component
// export const WebSocketProvider = ({ children }) => {
//   // State to store the socket instance
//   const [socket, setSocket] = useState(null);

//   // Access the authentication token from your AuthContext
//   const { token } = useContext(AuthContext);

//   useEffect(() => {
//     // Only initialize socket if token is available and socket is not already connected
//     if (token && !socket) {
//       // Initialize a new socket connection to the backend
//       const newSocket = io('https://taskmanager-backend-ahff.onrender.com', {
//         auth: { token }, // Pass the token for authentication
//         transports: ['websocket'], // Optional: force WebSocket for better reliability
       
//       });

//       // Save socket to state so it can be used throughout the app
//       setSocket(newSocket);

//       // Cleanup function to disconnect the socket on unmount
//       return () => {
//         newSocket.disconnect();
//       };
//     }
//   }, [token]); // Re-run effect if token changes

//   // Provide the socket to all children components
//   return (
//     <WebSocketContext.Provider value={socket}>
//       {children}
//     </WebSocketContext.Provider>
//   );
// };

// // Custom hook to use the socket context easily in components
// export const useWebSocket = () => {
//   return useContext(WebSocketContext);
// };
