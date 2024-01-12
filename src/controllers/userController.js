const userService = require("../services/userService");

class UserController {
  async getAllUsers(_req, res) {
    try {
      const users = await userService.getAllUsers();
      console.log("Users fetched successfully");
      console.log("Response:", users);
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getUserById(req, res) {
    const userId = req.params.id;
    try {
      const user = await userService.getUserById(userId);
      if (!user) {
        console.log(`User with ID ${userId} not found`);
        res.status(404).json({ error: "User not found" });
      } else {
        console.log(`User with ID ${userId} fetched successfully`);
        console.log("Response:", user);
        res.status(200).json(user);
      }
    } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async createUser(req, res) {
    const { name, username, email, password } = req.body;
  
    // Verifique se todos os campos obrigatórios estão presentes
    if (!name || !username || !email || !password) {
      const errorMessage = "Missing required fields";
      console.error(errorMessage);
      return res.status(400).json({ error: errorMessage });
    }
  
    try {
      // Verifique se o usuário com o mesmo e-mail já existe
      const existingUser = await userService.getUserByEmail(email);
      if (existingUser) {
        const errorMessage = `User with email ${email} already exists`;
        console.error(errorMessage);
        return res.status(409).json({ error: errorMessage });
      }
  
      const newUser = await userService.createUser({ name, username, email, password });
      const successMessage = `User "${username}" created successfully.`;
      console.log(successMessage);
      console.log("User details:", newUser);
      res.status(201).json(newUser);
    } catch (error) {
      const errorMessage = `Error creating user "${username}": ${error.message || error}`;
      console.error(errorMessage);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async updateUser(req, res) {
    const userId = req.params.id;
    const updatedUser = req.body;
    try {
      const user = await userService.updateUser(userId, updatedUser);
      if (!user) {
        console.log(`User with ID ${userId} not found for update`);
        res.status(404).json({ error: "User not found" });
      } else {
        console.log(`User with ID ${userId} updated successfully`);
        console.log("Updated user details:", user);
        res.status(200).json(user);
      }
    } catch (error) {
      console.error(`Error updating user with ID ${userId}:`, error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteUser(req, res) {
    const userId = req.params.id;
    try {
      const deletedUser = await userService.deleteUser(userId);
      if (!deletedUser) {
        console.log(`User with ID ${userId} not found for deletion`);
        res.status(404).json({ error: "User not found" });
      } else {
        console.log(`User with ID ${userId} deleted successfully`);
        console.log("Deleted user details:", deletedUser);
        res.status(200).json(deletedUser);
      }
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = UserController;
