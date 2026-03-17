
/**
*Author: 	DIEGO CASALLAS
*Date:		01/01/2026  
*Description:	This code defines a `RoleModel` class that provides methods for managing roles in a database. The class includes methods for adding a new role, updating an existing role, deleting a role, showing all roles, and showing a role by ID. Each method interacts with the database using SQL queries and handles errors appropriately, returning JSON responses with relevant status codes and messages.
**/
import { connect } from '../config/db/connect.js';

class RoleModel {
  constructor(id, name, descriptions) {
    this.id = id;
    this.name = name;
    this.descriptions = descriptions;
  }

  /**
   * The function `addRole` is an asynchronous function that adds a new role to a database table based
   * on the provided name and description, handling errors appropriately.
   * @param req - The `req` parameter in the `addRole` function likely represents the request object in
   * a Node.js application using Express or a similar framework. This object contains information about
   * the HTTP request that triggered the function, including details such as the request body, headers,
   * parameters, and more.
   * @param res - The `res` parameter in the `addRole` function is the response object that is used to
   * send a response back to the client making the request. It is typically provided by the Express.js
   * framework in Node.js and contains methods like `res.status()` and `res.json()` to send HTTP status
   * @returns If the `name` and `description` fields are missing in the request body, a response with
   * status code 400 and a JSON object containing an error message "Missing required fields" will be
   * returned.
   */
  async addRole(req, res) {
    try {
      const { name, description } = req.body;
      if (!name || !description) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      let sqlQuery = "INSERT INTO roles (Roles_name,Roles_description) VALUES (?,?)";
      const [result] = await connect.query(sqlQuery, [name, description]);
      res.status(201).json({
        data: [{ id: result.insertId, name, description }],
        status: 201
      });
    } catch (error) {
      res.status(500).json({ error: "Error adding Role", details: error.message });
    }
  }

  /**
   * The function `updateRole` updates a role in a database based on the provided name and description,
   * handling errors and returning appropriate responses.
   * @param req - The `req` parameter in the `updateRole` function is typically an object representing
   * the HTTP request. It contains information about the request made to the server, such as the request
   * body, parameters, headers, and more. In this specific function, `req` is used to access the request
   * body
   * @param res - The `res` parameter in the `updateRole` function is the response object that will be
   * used to send a response back to the client making the request. It is typically used to set the
   * status code, send data, and end the response. In this function, `res` is used to
   * @returns The `updateRole` function returns a JSON response with the following structure:
   */
  async updateRole(req, res) {
    try {
      const { name, description } = req.body;
      if (!name || !description) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      let sqlQuery = "UPDATE roles SET Roles_name=?,Roles_description=?,update_at=? WHERE Roles_id= ?";
      const update_at = new Date().toLocaleString("en-CA", { timeZone: "America/Bogota" }).replace(",", "").replace("/", "-").replace("/", "-");
      const [result] = await connect.query(sqlQuery, [name, description, update_at, req.params.id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: "Role not found" });
      res.status(200).json({
        data: [{ name, description, update_at }],
        status: 200,
        updated: result.affectedRows
      });
    } catch (error) {
      res.status(500).json({ error: "Error updating Role", details: error.message });
    }
  }

  /**
   * The function `deleteRRole` deletes a role from a database table based on the provided role ID and
   * returns a response indicating the success or failure of the deletion operation.
   * @param req - The `req` parameter typically represents the HTTP request in a Node.js application. It
   * contains information about the request made by the client, such as the request headers, parameters,
   * body, and more. In this specific function `deleteRRole`, `req` is likely an object that contains
   * the parameters
   * @param res - The `res` parameter in the `deleteRRole` function is the response object that will be
   * used to send a response back to the client making the request. It is typically used to send HTTP
   * responses with status codes, headers, and data back to the client. In the provided code snippet,
   * @returns If the role is successfully deleted, a JSON response with status code 200 will be
   * returned, containing an empty data array, a status of 200, and the number of rows deleted. If the
   * role is not found, a JSON response with status code 404 will be returned, indicating that the role
   * was not found. If an error occurs during the deletion process, a JSON response with status code
   */
  async deleteRRole(req, res) {
    try {
      let sqlQuery = "DELETE FROM roles WHERE Roles_id = ?";
      const [result] = await connect.query(sqlQuery, [req.params.id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: "Role not found" });
      res.status(200).json({
        data: [],
        status: 200,
        deleted: result.affectedRows
      });
    } catch (error) {
      res.status(500).json({ error: "Error deleting Role", details: error.message });
    }
  }

  /**
   * The function `showRole` fetches all roles from a database and returns them as a JSON response,
   * handling errors if they occur.
   * @param res - The `res` parameter in the `showRole` function is typically the response object in a
   * Node.js application. It is used to send the HTTP response back to the client making the request.
   */
  async showRole(res) {
    try {
      let sqlQuery = "SELECT * FROM roles";
      const [result] = await connect.query(sqlQuery);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Error fetching Roles", details: error.message });
    }
  }

  /**
   * The function `showRoleById` fetches a role from a database by its ID and returns it as a JSON
   * response, handling errors appropriately.
   * @param res - The `res` parameter in the `showRoleById` function is typically used to send the HTTP
   * response back to the client. It is an object that represents the response that an Express.js route
   * handler function sends when it receives an HTTP request. The `res` object has methods like
   * `status()`
   * @param req - The `req` parameter typically represents the request object in a Node.js application.
   * It contains information about the HTTP request made by the client, such as the request URL,
   * headers, parameters, and body. In this context, `req.params.id` is likely referring to a route
   * parameter named `id
   * @returns If the role with the specified ID exists in the database, the function will return the
   * details of that role in a JSON format with a status code of 200. If the role is not found (result
   * length is 0), it will return a JSON response with a status code of 404 indicating that the role
   * was not found. If an error occurs during the database query, it will return a
   */
  async showRoleById(res, req) {
    try {
      const [result] = await connect.query('SELECT * FROM roles WHERE Roles_id = ?', [req.params.id]);
      if (result.length === 0) return res.status(404).json({ error: "Role not found" });
      res.status(200).json(result[0]);
    } catch (error) {
      res.status(500).json({ error: "Error fetching Role", details: error.message });
    }
  }

}

export default RoleModel;