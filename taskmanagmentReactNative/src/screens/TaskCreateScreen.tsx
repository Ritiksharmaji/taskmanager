import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import AuthContext from "./../context/AuthContext";
import TaskContext from "./../context/TaskContext";
import UserProfile from "../components/UserProfile";
import { useNavigation } from "@react-navigation/native";

const TaskCreateScreen: React.FC = () => {
  const { tasks, createTask } = useContext(TaskContext);
  const { user } = useContext(AuthContext);
  const navigation = useNavigation<any>();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Validation
    if (!title.trim()) {
      Alert.alert("Error", "Task title cannot be empty.");
      return;
    }
    if (!description.trim()) {
      Alert.alert("Error", "Task description cannot be empty.");
      return;
    }
    if (!dueDate.trim()) {
      Alert.alert("Error", "Please select a due date.");
      return;
    }

    const taskExists = tasks.some(
      (task) => task.title.toLowerCase() === title.toLowerCase()
    );
    if (taskExists) {
      Alert.alert("Error", "A task with this title already exists.");
      return;
    }

    const newTask = { id: Date.now(), title, description, status, dueDate };

    try {
      setLoading(true);
      await createTask(newTask);

      Alert.alert("Success", "Task added successfully!");
      setTitle("");
      setDescription("");
      setStatus("pending");
      setDueDate("");
    } catch (error) {
      Alert.alert("Error", "Failed to create task. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Task Form Section */}
      <View style={styles.formSection}>
        <Text style={styles.heading}>Create a New Task</Text>

        <Text style={styles.label}>Task Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter task title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#ccc"
        />

        <Text style={styles.label}>Task Description</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Enter task description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          placeholderTextColor="#ccc"
        />

        <Text style={styles.label}>Status</Text>
        <TextInput
          style={styles.input}
          placeholder="pending / completed"
          value={status}
          onChangeText={setStatus}
          placeholderTextColor="#ccc"
        />

        <Text style={styles.label}>Due Date (YYYY-MM-DD)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter due date"
          value={dueDate}
          onChangeText={setDueDate}
          placeholderTextColor="#ccc"
        />

        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Add Task</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* User Profile Section */}
      <UserProfile />
    </ScrollView>
  );
};

export default TaskCreateScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#1e1e2f",
    alignItems: "center",
  },
  formSection: {
    flex: 2,
    backgroundColor: "#27293d",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    color: "#f0f0f5",
    marginBottom: 5,
    fontSize: 14,
  },
  input: {
    backgroundColor: "#32354a",
    color: "#fff",
    padding: 12,
    borderRadius: 6,
    marginBottom: 15,
    fontSize: 14,
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: "#6366f1",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
