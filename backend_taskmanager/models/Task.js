const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [ "pending", "completed"],
      default: "pending",
    },
    dueDate: {
      type: Date, 
      required: false, 
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
  },
  { timestamps: true } 
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
