const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User_relational");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "in-progress", "completed"),
    defaultValue: "pending",
  },
  dueDate: {
    type: DataTypes.DATEONLY, 
    allowNull: true, 
  },
},
{
  timestamps: false, 
});

// Relationship: One User -> Many Tasks
User.hasMany(Task, { foreignKey: "userId", onDelete: "CASCADE" });
Task.belongsTo(User, { foreignKey: "userId" });

module.exports = Task;
