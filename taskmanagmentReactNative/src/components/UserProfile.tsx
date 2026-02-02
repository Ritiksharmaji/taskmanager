import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AuthContext from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const UserProfile: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation<any>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri:
              user?.profileImage ||
              "https://th.bing.com/th/id/OIP.KnbpXB9cvYR3epwfrzu_wAHaI3?rs=1&pid=ImgDetMain",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>{user?.username || "N/A"}</Text>
        <Text style={styles.email}>{user?.email || "N/A"}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
  style={[styles.button, styles.primaryButton]}
  onPress={() => navigation.navigate("CreateTask")}
>
  <Text style={styles.buttonText}>Create Task</Text>
</TouchableOpacity>

<TouchableOpacity
  style={[styles.button, styles.primaryButton]}
  onPress={() => navigation.navigate("Dashboard")}
>
  <Text style={styles.buttonText}>Dashboard</Text>
</TouchableOpacity>

<TouchableOpacity
  style={[styles.button, styles.primaryButton]}
  onPress={() => navigation.navigate("Tasks")}
>
  <Text style={styles.buttonText}>Go to Task Manager</Text>
</TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={logout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserProfile;

// Named export for styles
export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f6fa",
  },

  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#4CAF50",
    marginBottom: 12,
  },

  username: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },

  email: {
    fontSize: 16,
    color: "#555",
  },

  buttonsContainer: {
    width: "100%",
  },

  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },

  primaryButton: {
    backgroundColor: "#4CAF50",
  },

  logoutButton: {
    backgroundColor: "#e53935",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
