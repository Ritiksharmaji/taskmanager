import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import TaskContext from "../context/TaskContext";
import UserProfile from "../components/UserProfile";

const UpdateTaskScreen: React.FC = () => {
  const { tasks, updateTask } = useContext(TaskContext);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { id } = route.params;
  const { taskId } = route.params;
  const existingTask = tasks.find((task) => task._id === taskId);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingTask) {
      setTaskData({
        title: existingTask.title || "",
        description: existingTask.description || "",
        dueDate: existingTask.dueDate
          ? existingTask.dueDate.split("T")[0]
          : "",
        status: existingTask.status || "pending",
      });
    }
  }, [existingTask]);

  const handleChange = (key: string, value: string) => {
    setTaskData({ ...taskData, [key]: value });
  };

  const handleSubmit = async () => {
    if (!existingTask) return;
    setLoading(true);
    try {
      await updateTask(id, taskData);
      alert("Task updated successfully!");
      navigation.navigate("TasksScreen");
    } catch (error) {
      alert("Failed to update task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!existingTask) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFoundText}>Task Not Found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Form Section */}
      <View style={styles.formSection}>
        <Text style={styles.heading}>Update Task</Text>

        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          value={taskData.title}
          onChangeText={(text) => handleChange("title", text)}
          placeholder="Enter title"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          value={taskData.description}
          onChangeText={(text) => handleChange("description", text)}
          placeholder="Enter description"
          placeholderTextColor="#aaa"
          multiline
        />

        <Text style={styles.label}>Status:</Text>
        <View style={styles.pickerContainer}>
          <TouchableOpacity
            style={[
              styles.statusButton,
              taskData.status === "pending" && styles.selectedStatus,
            ]}
            onPress={() => handleChange("status", "pending")}
          >
            <Text style={styles.statusText}>Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.statusButton,
              taskData.status === "completed" && styles.selectedStatus,
            ]}
            onPress={() => handleChange("status", "completed")}
          >
            <Text style={styles.statusText}>Completed</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Due Date:</Text>
        <TextInput
          style={styles.input}
          value={taskData.dueDate}
          onChangeText={(text) => handleChange("dueDate", text)}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>Update Task</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* User Section */}
      <View style={styles.userSection}>
        <UserProfile />
        <TouchableOpacity
          style={styles.taskManagerBtn}
          onPress={() => navigation.navigate("TasksScreen")}
        >
          <Text style={styles.submitText}>Go to Task Manager</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UpdateTaskScreen;

const styles = StyleSheet.create({
  container: {
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
    maxWidth: 600,
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 15,
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
  },
  textarea: {
    height: 80,
    textAlignVertical: "top",
  },
  pickerContainer: {
    flexDirection: "row",
    marginBottom: 15,
    gap: 10,
  },
  statusButton: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    backgroundColor: "#6366f1",
    alignItems: "center",
  },
  selectedStatus: {
    backgroundColor: "#4f52d1",
  },
  statusText: {
    color: "#fff",
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: "#00c853",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  userSection: {
    flex: 1,
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#27293d",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  taskManagerBtn: {
    marginTop: 15,
    backgroundColor: "#ff4b5c",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    color: "#ff4b5c",
    fontSize: 18,
  },
});
