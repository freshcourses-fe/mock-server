const path = require('path');
const fs = require('fs').promises;
const { readFileOpts } = require('../config/db.json');

const dbPath = path.resolve(__dirname, '../', 'db/', 'users.json');
class User {
  static async create(userData) {
    const usersDataString = await fs.readFile(dbPath, readFileOpts);

    const users = JSON.parse(usersDataString ? usersDataString : '[]');

    const newUser = {
      ...userData,
      id: Date.now(),
    };

    const existingUser = users.find(
      (user) => user.email.toLowerCase() === newUser.email.toLowerCase()
    );

    if (existingUser) {
      const error = new Error('User with this email already exists');
      error.code = 409;
      throw error;
    }

    users.push(newUser);

    const newUserData = JSON.stringify(users, null, 2);

    await fs.writeFile(dbPath, newUserData);

    return newUser;
  }

  static async getAll() {
    const usersDataString = await fs.readFile(dbPath, readFileOpts);

    const users = JSON.parse(usersDataString ? usersDataString : '[]');

    return users;
  }

  static async get(id) {
    const usersDataString = await fs.readFile(dbPath, readFileOpts);

    const users = JSON.parse(usersDataString ? usersDataString : '[]');

    const user = users.find((user) => user.id === +id);

    if (!users.length || !user) {
      const error = new Error('User not found');
      error.code = 404;
      throw error;
    }

    return user;
  }

  static async getByEmail(email) {
    const usersDataString = await fs.readFile(dbPath, readFileOpts);
    const users = JSON.parse(usersDataString ? usersDataString : '[]');

    const user = users.find((user) => {
      const res = user.email.toLowerCase() === email.toLowerCase();

      return res;
    });

    if (!users.length || !user) {
      const error = new Error('User not found');
      error.code = 404;
      throw error;
    }

    return user;
  }

  static async update(userData, id) {
    const usersDataString = await fs.readFile(dbPath, readFileOpts);
    const users = JSON.parse(usersDataString ? usersDataString : '[]');

    const userIndex = users.findIndex((user) => user.id === +id);

    if (!users.length || userIndex === -1) {
      const error = new Error('User not found');
      error.code = 404;
      throw error;
    }

    const newUsers = users.map((user, index) => {
      const isSameUser = index === userIndex;

      const updatedUser = isSameUser ? { ...user, ...userData } : { ...user };
      return updatedUser;
    });

    const newUserData = JSON.stringify(newUsers, null, 2);

    await fs.writeFile(dbPath, newUserData);

    return updatedUsers[userIndex];
  }

  static async remove(id) {
    const usersDataString = await fs.readFile(dbPath, readFileOpts);

    const users = JSON.parse(usersDataString ? usersDataString : '[]');

    const userIndex = users.findIndex((user) => user.id === +id);

    if (!users.length || userIndex === -1) {
      const error = new Error('User not found');
      error.code = 404;
      throw error;
    }

    const newUsers = users.filter((user) => user.id !== +id);

    const newUserData = JSON.stringify(newUsers, null, 2);

    await fs.writeFile(dbPath, newUserData);

    return id;
  }
}

module.exports = User;
