const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Task = require('./task'); // Import modelu task
const Raport = require('./raport'); // Import modelu raport

const RaportsInTask = sequelize.define('RaportsInTask', {
  task_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Task, // Nazwa modelu referencyjnego
      key: 'id' // Klucz, do którego się odnosimy
    },
    allowNull: false
  },
  raport_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Raport, // Nazwa modelu referencyjnego
      key: 'id' // Klucz, do którego się odnosimy
    },
    allowNull: false
  }
}, {
  tableName: 'raports_in_task',
  timestamps: false 
});

// Ustanawianie relacji wiele do wielu
Task.belongsToMany(Raport, { through: RaportsInTask, foreignKey: 'task_id' });
Raport.belongsToMany(Task, { through: RaportsInTask, foreignKey: 'raport_id' });

module.exports = RaportsInTask;