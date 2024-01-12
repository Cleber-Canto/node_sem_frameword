const { createDatabaseConnection } = require("../database/database");
const { randomUUID } = require('crypto');
const db = createDatabaseConnection();

class UserService {
  async getAllUsers() {
    const db = createDatabaseConnection();

    try {
      await db.connect();
      const result = await db.query("SELECT * FROM users");
      return result.rows;
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw new Error("Internal Server Error");
    } finally {
      await db.end();
    }
  }

  async getUserById(userId) {
    const db = createDatabaseConnection();

    try {
      await db.connect();
      const result = await db.query("SELECT * FROM users WHERE id = $1", [userId]);
      return result.rows[0];
    } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
      throw new Error("Internal Server Error");
    } finally {
      await db.end();
    }
  }

  async getUserByEmail(email) {
    const db = createDatabaseConnection();

    try {
      await db.connect();
      const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
      return result.rows[0];
    } catch (error) {
      console.error(`Error fetching user by email ${email}:`, error);
      throw new Error("Internal Server Error");
    } finally {
      await db.end();
    }
  }

  async createUser({ name, username, email, password }) {
    try {
      await db.connect();

      // Verifique se o usuário com o mesmo e-mail já existe
      const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);
      if (existingUser.rows.length > 0) {
        throw new Error(`User with email ${email} already exists`);
      }

      const userId = randomUUID(); // Gere um UUID aleatório
      const result = await db.query(
        "INSERT INTO users (id, name, username, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [userId, name, username, email, password]
      );

      return result.rows[0];
    } catch (error) {
      console.error(`Error creating user: ${error.message || error}`);
      throw new Error("Internal Server Error");
    } finally {
      await db.end();
    }
  }

  async updateUser(userId, updatedUser) {
    const db = createDatabaseConnection();

    try {
      await db.connect();
      const { name, email } = updatedUser;
      const result = await db.query("UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *", [name, email, userId]);
      return result.rows[0];
    } catch (error) {
      console.error(`Error updating user with ID ${userId}:`, error);
      throw new Error("Internal Server Error");
    } finally {
      await db.end();
    }
  }

  async deleteUser(userId) {
    const db = createDatabaseConnection();

    try {
      await db.connect();
      const result = await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [userId]);
      return result.rows[0];
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
      throw new Error("Internal Server Error");
    } finally {
      await db.end();
    }
  }
}

module.exports = new UserService();
