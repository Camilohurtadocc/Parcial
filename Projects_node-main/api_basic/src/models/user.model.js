
/**
*Author: 	DIEGO CASALLAS
*Date:		01/01/2026  
*Description:	This code defines a `UserModel` class that provides methods for managing users in a database. The class includes methods for adding a new user, updating an existing user, deleting a user, showing all users, and showing a user by ID. Each method interacts with the database using SQL queries and handles errors appropriately, returning JSON responses with relevant status codes and messages. The `addUser` method also hashes the user's password before storing it in the database for security purposes.
**/
import { connect } from '../config/db/connect.js';
import { encryptPassword } from '../library/appBcrypt.js';

class UserModel {
  constructor(id, user, password, status, role) {
    this.id = id;
    this.user = user;
    this.password = password;
    this.status = status;
    this.role = role;
  }

  /**
   * The function `addUser` is an asynchronous function that adds a new user to a database table with
   * error handling for missing fields and encryption of the password.
   * @param req - The `req` parameter in the `addUser` function represents the request object, which
   * contains information about the HTTP request made to the server. This object typically includes
   * details such as the request headers, parameters, body, URL, and more. In this context, `req.body`
   * is used to
   * @param res - The `res` parameter in the `addUser` function is the response object that is used to
   * send a response back to the client making the request. It is typically provided by the Express.js
   * framework in Node.js applications and contains methods like `res.status()` and `res.json()` to
   * send HTTP
   * @returns If any of the required fields (user, email, password, status, role) are missing in the
   * request body, the function will return a 400 status with a JSON response indicating "Missing
   * required fields". If there is an error during the process of adding a user to the database, it
   * will return a 500 status with a JSON response indicating "Error adding user" along with details of
   * the
   */
  async addUser(req, res) {
    try {
      const { user, email, password, status, role } = req.body;
      if (!user || !email || !password || !status || !role) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const hashedPassword = await encryptPassword(password);
      let sqlQuery = "INSERT INTO users (User_user,User_email,User_password,User_status_fk,Roles_fk ) VALUES (?,?,?,?,?)";
      const [result] = await connect.query(sqlQuery, [user, email, hashedPassword, status, role]);
      res.status(201).json({
        data: [{ id: result.insertId, user, hashedPassword, status, role }],
        status: 201
      });
    } catch (error) {
      res.status(500).json({ error: "Error adding user", details: error.message });
    }
  }

 /**
  * The function `updateUser` updates a user's information in a database based on the provided request
  * body and parameters.
  * @param req - The `req` parameter in the `updateUser` function is the request object that contains
  * information about the HTTP request made to the server. It includes details such as the request
  * headers, parameters, body, URL, and more. In this function, `req` is used to access the request
  * body
  * @param res - The `res` parameter in the `updateUser` function is the response object that will be
  * used to send a response back to the client making the request. It is typically used to send HTTP
  * responses with status codes, headers, and data back to the client. In this function, `res`
  * @returns The updateUser function returns a JSON response with the updated user data including user,
  * status, role, and updated_at fields, along with the status code and the number of rows affected by
  * the update operation. If there are missing required fields in the request body, it returns a 400
  * status with an error message. If the user is not found in the database, it returns a 404 status
  * with an
  */
  async updateUser(req, res) {
    try {
      const { user, status, role } = req.body;
      if (!user || !status || !role) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      let sqlQuery = "UPDATE users SET User_user=?,User_status_fk=?,Roles_fk  =?,updated_at=? WHERE User_id= ?";
      const updated_at = new Date().toLocaleString("en-CA", { timeZone: "America/Bogota" }).replace(",", "").replace("/", "-").replace("/", "-");
      const [result] = await connect.query(sqlQuery, [user, status, role, updated_at, req.params.id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: "user not found" });
      res.status(200).json({
        data: [{ user, status, role, updated_at }],
        status: 200,
        updated: result.affectedRows
      });
    } catch (error) {
      res.status(500).json({ error: "Error updating user", details: error.message });
    }
  }

 /**
  * This function deletes a user from a database based on the provided user ID and returns a response
  * indicating the success or failure of the operation.
  * @param req - The `req` parameter typically represents the HTTP request in a Node.js application. It
  * contains information about the request made by the client, such as the request headers, parameters,
  * body, and more. In this context, `req` is likely an object that contains the parameters sent in the
  * request to
  * @param res - The `res` parameter in the `deleteUser` function is the response object that is used
  * to send a response back to the client making the request. It is typically used to set the status
  * code, send data, and end the response. In the provided code snippet, `res` is used
  * @returns If the user is not found, a response with status code 404 and an error message "user not
  * found" is returned. If the deletion is successful, a response with status code 200, an empty data
  * array, status 200, and the number of rows deleted is returned. If an error occurs during the
  * deletion process, a response with status code 500 and an error message "Error
  */
  async deleteUser(req, res) {
    try {
      let sqlQuery = "DELETE FROM users WHERE User_id = ?";
      const [result] = await connect.query(sqlQuery, [req.params.id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: "user not found" });
      res.status(200).json({
        data: [],
        status: 200,
        deleted: result.affectedRows
      });
    } catch (error) {
      res.status(500).json({ error: "Error deleting user", details: error.message });
    }
  }

/**
 * The function `showUser` fetches all users from a database and returns them as a JSON response,
 * handling errors appropriately.
 * @param res - The `res` parameter in the `showUser` function is typically the response object in a
 * Node.js application. It is used to send the HTTP response back to the client making the request.
 */
  async showUser(res) {
    try {
      let sqlQuery = "SELECT * FROM users";
      const [result] = await connect.query(sqlQuery);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Error fetching users", details: error.message });
    }
  }

 /**
  * The function `showUserById` retrieves a user from a database by their ID and returns the user data
  * if found, or an error message if not found or an error occurs.
  * @param res - The `res` parameter in the `showUserById` function is typically used to send the HTTP
  * response back to the client. It is an object that represents the response that an Express.js route
  * handler function receives. You can use methods like `res.status()`, `res.json()`, and others
  * @param req - The `req` parameter typically represents the request object in a Node.js application.
  * It contains information about the HTTP request that triggered the function, such as request
  * headers, parameters, body, and more. In this specific function `showUserById`, `req` is likely used
  * to extract the user ID
  * @returns If the user with the specified ID is found in the database, the details of that user will
  * be returned in the response with a status code of 200. If the user is not found (result length is
  * 0), a JSON response with an error message "user not found" and a status code of 404 will be
  * returned. If there is an error during the database query, a JSON
  */
  async showUserById(res, req) {
    try {
      const [result] = await connect.query('SELECT * FROM users WHERE User_id = ?', [req.params.id]);
      if (result.length === 0) return res.status(404).json({ error: "user not found" });
      res.status(200).json(result[0]);
    } catch (error) {
      res.status(500).json({ error: "Error fetching user", details: error.message });
    }
  }

}

export default UserModel;