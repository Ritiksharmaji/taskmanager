import React, { useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import TaskContext from "./../context/TaskContext";
import { useNavigation } from "@react-navigation/native";

const TaskListScreen: React.FC = () => {
  const { tasks, removeTask, updateTask, actionLoading } =
    useContext(TaskContext);
  const navigation = useNavigation<any>();

  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"delete" | "complete" | null>(
    null
  );
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const openModal = (type: "delete" | "complete", taskId: string) => {
    setModalType(type);
    setSelectedTaskId(taskId);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalType(null);
    setSelectedTaskId(null);
  };

  const handleConfirm = async () => {
    if (!selectedTaskId) return;

    if (modalType === "delete") await removeTask(selectedTaskId);
    if (modalType === "complete") {
      const task = tasks.find((t) => t._id === selectedTaskId);
      if (task) await updateTask(selectedTaskId, { ...task, status: "completed" });
    }

    closeModal();
  };

  const renderTask = ({ item }: any) => {
    const isExpanded = expandedTaskId === item._id;
    const isUpdating =
      actionLoading.type === "update" && actionLoading.taskId === item._id;
    const isDeleting =
      actionLoading.type === "delete" && actionLoading.taskId === item._id;

    return (
      <View style={styles.taskItem}>
        <View style={styles.taskContent}>
          <Text style={styles.taskTitle}>
            <Text style={{ fontWeight: "bold" }}>Title:</Text> {item.title}
          </Text>

          <Text style={styles.taskDescription}>
            <Text style={{ fontWeight: "bold" }}>Description:</Text>{" "}
            {isExpanded
              ? item.description
              : item.description.length > 100
              ? item.description.slice(0, 100) + "..."
              : item.description}
          </Text>

          {item.description.length > 100 && (
            <TouchableOpacity
              onPress={() =>
                setExpandedTaskId(isExpanded ? null : item._id)
              }
            >
              <Text style={styles.readMore}>
                {isExpanded ? "Read Less" : "Read More"}
              </Text>
            </TouchableOpacity>
          )}

          <Text style={styles.taskStatus}>
            <Text style={{ fontWeight: "bold" }}>Status:</Text> {item.status}
          </Text>
        </View>

        <View style={styles.taskActions}>
          <TouchableOpacity
            style={[styles.button, styles.updateBtn]}
            onPress={() => navigation.navigate("UpdateTask", { taskId: item._id })}
            disabled={isUpdating || isDeleting}
          >
            <Text style={styles.buttonText}>
              {isUpdating ? "Updating..." : "Update"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.deleteBtn]}
            onPress={() => openModal("delete", item._id)}
            disabled={isDeleting}
          >
            <Text style={styles.buttonText}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Text>
          </TouchableOpacity>

          {item.status !== "completed" && (
            <TouchableOpacity
              style={[styles.button, styles.completeBtn]}
              onPress={() => openModal("complete", item._id)}
              disabled={isUpdating}
            >
              <Text style={styles.buttonText}>
                {isUpdating ? "Completing..." : "Complete"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {tasks.length === 0 ? (
        <Text style={styles.noTasks}>No tasks available</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item._id}
          renderItem={renderTask}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      {/* Confirmation Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              {modalType === "delete" ? "Delete Task" : "Complete Task"}
            </Text>
            <Text style={styles.modalMessage}>
              {modalType === "delete"
                ? "Are you sure you want to delete this task?"
                : "Are you sure you want to mark this task as completed?"}
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.modalBtn, styles.confirmBtn]} onPress={handleConfirm}>
                <Text style={styles.buttonText}>
                  {modalType === "delete" ? "Delete" : "Complete"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.cancelBtn]} onPress={closeModal}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TaskListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1e1e2f",
  },
  noTasks: {
    color: "#ff4b5c",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  taskItem: {
    backgroundColor: "#32354a",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  taskContent: {
    marginBottom: 10,
  },
  taskTitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  taskDescription: {
    color: "#c0c0c0",
    fontSize: 14,
    marginBottom: 5,
  },
  readMore: {
    color: "#6366f1",
    textDecorationLine: "underline",
    marginBottom: 5,
  },
  taskStatus: {
    color: "#fff",
    fontSize: 14,
  },
  taskActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
    marginTop: 5,
  },
  updateBtn: { backgroundColor: "#6366f1" },
  deleteBtn: { backgroundColor: "#ff4b5c" },
  completeBtn: { backgroundColor: "#00c853" },
  buttonText: { color: "#fff", fontSize: 14, fontWeight: "500" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#27293d",
    padding: 20,
    borderRadius: 10,
    width: "85%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  confirmBtn: { backgroundColor: "#ff4b5c" },
  cancelBtn: { backgroundColor: "#6366f1" },
});
