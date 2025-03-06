import { BrowserRouter , Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import RegisterForm from "./pages/RegisterForm";
import Dashboard from "./pages/DashBoard/Dashboard";
import TaskForm from "./components/TaskForm";
import TaskManager from "./components/TaskManager";

function App() {
  return (
    <BrowserRouter> 
      <AuthProvider>
        <TaskProvider>  
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tash" element={<TaskForm />} />
            <Route path="/taskmanager" element={<TaskManager />} />
            
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
