import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthContext from "../context/AuthContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { login } = useContext(AuthContext);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Dashboard" }],
        });
      }
    };

    checkToken();
  }, []);

  const onSubmitFailure = (msg: string) => {
    setErrorMsg(msg || "Something went wrong. Please try again.");
  };

  const onSubmitForm = async () => {
    if (!email.trim() || !password.trim()) {
      onSubmitFailure("Email and password cannot be empty.");
      return;
    }

    try {
      const response = await login({ email, password });

      if (response?.token) {
        await AsyncStorage.setItem("token", response.token);

        navigation.reset({
          index: 0,
          routes: [{ name: "Dashboard" }],
        });
      } else {
        onSubmitFailure("Login failed. Please try again.");
      }
    } catch (error: any) {
      onSubmitFailure("Network error. Please try again.");
      console.log("Login Error:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        {/* IMAGE SECTION */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://img.freepik.com/free-vector/project-manager-concept-illustration_114360-21568.jpg",
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* FORM SECTION */}
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Login</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={onSubmitForm}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

          <Text style={styles.switchAuth}>
            Don’t have an account?{" "}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("Register")}
            >
              Register
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#272727",
    borderRadius: 15,
    overflow: "hidden",
  },
  imageContainer: {
    height: 220,
    backgroundColor: "#333",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  formContainer: {
    padding: 30,
  },
  heading: {
    fontSize: 26,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 18,
  },
  label: {
    color: "#fff",
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#6366f1",
    borderRadius: 6,
    padding: 12,
    color: "#fff",
  },
  button: {
    backgroundColor: "#4f46e5",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    color: "#ff0b37",
    marginTop: 8,
    fontSize: 13,
  },
  switchAuth: {
    marginTop: 15,
    color: "#fff",
    textAlign: "center",
  },
  link: {
    color: "#6366f1",
    fontWeight: "600",
  },
});
