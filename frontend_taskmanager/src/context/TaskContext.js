// import React, {
//   createContext,
//   useState,
//   useContext,
//   useEffect,
//   useCallback
// } from "react";
// import { fetchTasks, addTask, deleteTask, editTask } from "../services/api";
// import AuthContext from "./AuthContext";
// import { useWebSocket } from "./WebSocketContext";

// const TaskContext = createContext();

// export const TaskProvider = ({ children }) => {
//   const { token } = useContext(AuthContext);
//   const socket = useWebSocket();

//   const [tasks, setTasks] = useState([]);

//   // Loader states
//   const [loading, setLoading] = useState(false); // for initial fetch
//   const [actionLoading, setActionLoading] = useState({
//     type: null, // "fetch" | "create" | "update" | "delete"
//     taskId: null
//   });

//   /* -------------------- FETCH TASKS -------------------- */
//   const loadTasks = useCallback(async () => {
//     if (!token) return;

//     setLoading(true);
//     setActionLoading({ type: "fetch", taskId: null });

//     try {
//       const { data } = await fetchTasks(token);
//       setTasks(data);
//     } catch (error) {
//       console.error("Error loading tasks:", error);
//     } finally {
//       setLoading(false);
//       setActionLoading({ type: null, taskId: null });
//     }
//   }, [token]);

//   useEffect(() => {
//     loadTasks();
//   }, [loadTasks]);

//   /* -------------------- WEBSOCKET EVENTS -------------------- */
//   useEffect(() => {
//     if (!socket) return;

//     socket.on("taskCreated", (newTask) => {
//       setTasks((prev) => [...prev, newTask]);
//     });

//     socket.on("taskUpdated", (updatedTask) => {
//       setTasks((prev) =>
//         prev.map((task) =>
//           task._id === updatedTask._id ? updatedTask : task
//         )
//       );
//     });

//     socket.on("taskDeleted", (taskId) => {
//       setTasks((prev) => prev.filter((task) => task._id !== taskId));
//     });

//     return () => {
//       socket.off("taskCreated");
//       socket.off("taskUpdated");
//       socket.off("taskDeleted");
//     };
//   }, [socket]);

//   /* -------------------- CREATE TASK -------------------- */
//   const createTask = async (taskData) => {
//     setActionLoading({ type: "create", taskId: null });

//     try {
//       await addTask(taskData, token);
//     } catch (error) {
//       console.error("Error creating task:", error);
//     } finally {
//       setActionLoading({ type: null, taskId: null });
//     }
//   };

//   /* -------------------- UPDATE TASK -------------------- */
//   const updateTask = async (taskId, updatedTaskData) => {
//     setActionLoading({ type: "update", taskId });

//     try {
//       await editTask(taskId, updatedTaskData, token);
//     } catch (error) {
//       console.error("Error updating task:", error);
//     } finally {
//       setActionLoading({ type: null, taskId: null });
//     }
//   };

//   /* -------------------- DELETE TASK -------------------- */
//   const removeTask = async (taskId) => {
//     setActionLoading({ type: "delete", taskId });

//     try {
//       await deleteTask(taskId, token);
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     } finally {
//       setActionLoading({ type: null, taskId: null });
//     }
//   };

//   return (
//     <TaskContext.Provider
//       value={{
//         tasks,
//         loading,
//         actionLoading,
//         createTask,
//         updateTask,
//         removeTask
//       }}
//     >
//       {children}
//     </TaskContext.Provider>
//   );
// };

// export default TaskContext;

import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { fetchTasks, addTask, deleteTask, editTask } from "../services/api";
import AuthContext from "./AuthContext";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { token } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState({
    type: null,
    taskId: null,
  });

  /* -------------------- LOAD TASKS -------------------- */
  const loadTasks = useCallback(async () => {
    if (!token) {
      setTasks([]); // reset tasks if no token
      return;
    }

    try {
      setLoading(true);
      const response = await fetchTasks(token); // should return { tasks: [...] } or array
      setTasks(response.data || []); // fallback to empty array
    } catch (error) {
      console.error("Error loading tasks:", error);
      setTasks([]); // clear tasks on error
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  /* -------------------- ACTIONS -------------------- */
  const createTask = async (taskData) => {
    if (!token) return;
    try {
      setActionLoading({ type: "create", taskId: null });
      await addTask(taskData, token);
      await loadTasks(); // refresh list
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setActionLoading({ type: null, taskId: null });
    }
  };

  const updateTask = async (taskId, updatedTaskData) => {
    if (!token) return;
    try {
      setActionLoading({ type: "update", taskId });
      await editTask(taskId, updatedTaskData, token);
      await loadTasks(); // refresh list
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setActionLoading({ type: null, taskId: null });
    }
  };

  const removeTask = async (taskId) => {
    if (!token) return;
    try {
      setActionLoading({ type: "delete", taskId });
      await deleteTask(taskId, token);
      await loadTasks(); // refresh list
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setActionLoading({ type: null, taskId: null });
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        actionLoading,
        createTask,
        updateTask,
        removeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
