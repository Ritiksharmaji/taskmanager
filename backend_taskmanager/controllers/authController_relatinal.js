// const bcrypt = require("bcryptjs");
// const User = require("../models/User");
// const { generateToken } = require("../middleware/authMiddleware");
// exports.register = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ error: "Email already registered" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ username, email, password: hashedPassword });
//     console.log("user has registered", user);
//     res.status(201).json({ message: "User registered", userId: user.id });
//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({ error: "Registration failed", details: error.message });
//   }
// };


// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log(`email and password when logging in: ${email} ${password}`);
//     if (!email || !password) {
//       return res.status(400).json({ error: "All fields are required" });
//     }
    
//     const user = await User.findOne({ where: { email } });
//     console.log("user found",user);
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     const token = generateToken(user);
//     console.log("user has logged in",user);
//     res.json({ message: "Login successful", token ,user});
//   } catch (error) {
//     res.status(500).json({ error: "Login failed" });
//   }
// };
