import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import TaskContext from "./../context/TaskContext";
import UserProfile from "../components/UserProfile";

const DashboardScreen = () => {
  const { tasks, removeTask } = useContext(TaskContext);

  const [showModal, setShowModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const openDeleteModal = (taskId) => {
    setSelectedTaskId(taskId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    removeTask(selectedTaskId);
    setShowModal(false);
    setSelectedTaskId(null);
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>
        <Text style={styles.taskTitle}>{item.title}</Text> - {item.status}
      </Text>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => openDeleteModal(item._id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* TASK SECTION */}
      <View style={styles.taskSection}>
        <Text style={styles.heading}>Task Dashboard</Text>

        {tasks.length === 0 ? (
          <Text style={styles.emptyText}>No tasks available</Text>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item._id}
            renderItem={renderTask}
          />
        )}
      </View>

      {/* USER SECTION */}
      <View style={styles.userSection}>
        <UserProfile />
      </View>

      {/* DELETE MODAL */}
      <Modal
        transparent
        visible={showModal}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Delete Task</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete this task?
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={confirmDelete}
              >
                <Text style={styles.modalBtnText}>Yes, Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DashboardScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e2f",
    padding: 16,
  },

  heading: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },

  taskSection: {
    backgroundColor: "#27293d",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },

  emptyText: {
    color: "#ccc",
    textAlign: "center",
    marginTop: 20,
  },

  taskItem: {
    backgroundColor: "#323450",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  taskText: {
    color: "#fff",
    flex: 1,
  },

  taskTitle: {
    fontWeight: "bold",
  },

  deleteButton: {
    backgroundColor: "#ff4b5c",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 10,
  },

  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
  },

  userSection: {
    backgroundColor: "#27293d",
    padding: 16,
    borderRadius: 8,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    backgroundColor: "#fff",
    width: 300,
    padding: 20,
    borderRadius: 8,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },

  modalText: {
    textAlign: "center",
    marginBottom: 20,
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  confirmBtn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 8,
  },

  cancelBtn: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },

  modalBtnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "500",
  },
});
