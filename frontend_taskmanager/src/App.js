import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import RegisterForm from "./pages/RegisterForm";
import Dashboard from "./pages/DashBoard/Dashboard";
import TaskForm from "./components/TaskForm";
import TaskManager from "./components/TaskManager";
import TaskList from "./components/TaskList";
import UpdateTask from "./components/UpdateTask";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";


const ProtectedRoute = ({ element }) => {
  const { user } = useContext(AuthContext);  
  return user ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter> 
      <AuthProvider>
        <TaskProvider>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/task-create" element={<ProtectedRoute element={<TaskForm />} />} />
            <Route path="/tasks" element={<ProtectedRoute element={<TaskManager />} />} />
            <Route path="/update-task/:id" element={<ProtectedRoute element={<UpdateTask />} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
          <ToastContainer />
        </TaskProvider>
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
