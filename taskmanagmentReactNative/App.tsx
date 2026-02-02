import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthProvider } from "./src/context/AuthContext";
import { TaskProvider } from "./src/context/TaskContext";
import AuthContext from "./src/context/AuthContext";

import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import TaskCreateScreen from "./src/screens/TaskCreateScreen";
import TaskListScreen from "./src//screens/TaskListScreen";
import UpdateTaskScreen from "./src/screens/UpdateTaskScreen";


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        // 🔐 AUTH STACK
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        // 🔓 APP STACK
        <>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="CreateTask" component={TaskCreateScreen} />
          <Stack.Screen name="Tasks" component={TaskListScreen} />
          <Stack.Screen name="UpdateTask" component={UpdateTaskScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
// this is f or testing purpose
const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;
