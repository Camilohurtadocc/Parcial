/**
*Author: 	DIEGO CASALLAS
 *Date:		01/01/2026  
 *Description:	This code defines a `RoleModuleModel` class that provides methods for managing role_modules in a database. The class includes methods for adding a new role_module, updating an existing role_module, deleting a role_module, showing all role_modules, and showing a role_module by ID. Each method interacts with the database using SQL queries and handles errors appropriately, returning JSON responses with relevant status codes and messages.
 **/
import { connect } from '../config/db/connect.js';

class RoleModuleModel {
  constructor(id, modulesFk, rolesFk) {
    this.id = id;
    this.modulesFk = modulesFk;
    this.rolesFk = rolesFk;
  }

  /**
   * The function `addRoleModule` is an asynchronous function that adds a new role_module to a database table based
   * on the provided modulesFk and rolesFk, handling errors appropriately.
   * @param req - The `req` parameter in the `addRoleModule` function likely represents the request object in
   * a Node.js application using Express or a similar framework. This object contains information about
   * the HTTP request that triggered the function, including details such as the request body, headers,
   * parameters, and more.
   * @param res - The `res` parameter in the `addRoleModule` function is the response object that is used to
   * send a response back to the client making the request. It is typically provided by the Express.js
   * framework in Node.js and contains methods like `res.status()` and `res.json()` to send HTTP status
   * @returns If the `modulesFk` and `rolesFk` fields are missing in the request body, a response with
   * status code 400 and a JSON object containing an error message "Missing required fields" will be
   * returned.
   */
  async addRoleModule(req, res) {
    try {
      const { modulesFk, rolesFk } = req.body;
      if (!modulesFk || !rolesFk) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      let sqlQuery = "INSERT INTO role_modules (Modules_fk,Roles_fk) VALUES (?,?)";
      const [result] = await connect.query(sqlQuery, [modulesFk, rolesFk]);
      res.status(201).json({
        data: [{ id: result.insertId, modulesFk, rolesFk }],
        status: 201
      });
    } catch (error) {
      res.status(500).json({ error: "Error adding Role Module", details: error.message });
    }
  }

  /**
   * The function `updateRoleModule` updates a role_module in a database based on the provided modulesFk and rolesFk,
   * handling errors and returning appropriate responses.
   * @param req - The `req` parameter in the `updateRoleModule` function is typically an object representing
   * the HTTP request. It contains information about the request made to the server, such as the request
   * body, parameters, headers, and more. In this specific function, `req` is used to access the request
   * body
   * @param res - The `res` parameter in the `updateRoleModule` function is the response object that will be
   * used to send a response back to the client making the request. It is typically used to set the
   * status code, send data, and end the response. In this function, `res` is used to
   * @returns The `updateRoleModule` function returns a JSON response with the following structure:
   */
  async updateRoleModule(req, res) {
    try {
      const { modulesFk, rolesFk } = req.body;
      if (!modulesFk || !rolesFk) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      let sqlQuery = "UPDATE role_modules SET Modules_fk=?,Roles_fk=?,updated_at=? WHERE RoleModules_id= ?";
      const update_at = new Date().toLocaleString("en-CA", { timeZone: "America/Bogota" }).replace(",", "").replace("/", "-").replace("/", "-");
      const [result] = await connect.query(sqlQuery, [modulesFk, rolesFk, update_at, req.params.id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: "Role Module not found" });
      res.status(200).json({
        data: [{ modulesFk, rolesFk, update_at }],
        status: 200,
        updated: result.affectedRows
      });
    } catch (error) {
      res.status(500).json({ error: "Error updating Role Module", details: error.message });
    }
  }

  /**
   * The function `deleteRoleModule` deletes a role_module from a database table based on the provided role_module ID and
   * returns a response indicating the success or failure of the deletion operation.
   * @param req - The `req` parameter typically represents the HTTP request in a Node.js application. It
   * contains information about the request made by the client, such as the request headers, parameters,
   * body, and more. In this specific function `deleteRoleModule`, `req` is likely an object that contains
   * the parameters
   * @param res - The `res` parameter in the `deleteRoleModule` function is the response object that will be
   * used to send a response back to the client making the request. It is typically used to send HTTP
   * responses with status codes, headers, and data back to the client.
   * @returns If the role_module is successfully deleted, a JSON response with status code 200 will be
   * returned, containing an empty data array, a status of 200, and the number of rows deleted. If the
   * role_module is not found, a JSON response with status code 404 will be returned, indicating that the role_module
   * was not found. If an error occurs during the deletion process, a JSON response with status code 500
   */
  async deleteRoleModule(req, res) {
    try {
      let sqlQuery = "DELETE FROM role_modules WHERE RoleModules_id = ?";
      const [result] = await connect.query(sqlQuery, [req.params.id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: "Role Module not found" });
      res.status(200).json({
        data: [],
        status: 200,
        deleted: result.affectedRows
      });
    } catch (error) {
      res.status(500).json({ error: "Error deleting Role Module", details: error.message });
    }
  }

  /**
   * The function `showRoleModule` fetches all role_modules from a database and returns them as a JSON response,
   * handling errors if they occur.
   * @param res - The `res` parameter in the `showRoleModule` function is typically the response object in a
   * Node.js application. It is used to send the HTTP response back to the client making the request.
   */
  async showRoleModule(res) {
    try {
      let sqlQuery = "SELECT * FROM role_modules";
      const [result] = await connect.query(sqlQuery);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Error fetching Role Modules", details: error.message });
    }
  }

  /**
   * The function `showRoleModuleById` fetches a role_module from a database by its ID and returns it as a JSON
   * response, handling errors appropriately.
   * @param res - The `res` parameter in the `showRoleModuleById` function is typically used to send the HTTP
   * response back to the client. It is an object that represents the response that an Express.js route
   * handler function sends when it receives an HTTP request. The `res` object has methods like `status()`
   * @param req - The `req` parameter typically represents the request object in a Node.js application.
   * It contains information about the HTTP request made by the client, such as the request URL,
   * headers, parameters, and body. In this context, `req.params.id` is likely referring to a route
   * parameter named `id
   * @returns If the role_module with the specified ID exists in the database, the function will return the
   * details of that role_module in a JSON format with a status code of 200. If the role_module is not found (result
   * length is 0), it will return a JSON response with a status code 404 indicating that the role_module
   * was not found. If an error occurs during the database query, it will return a
   */
  async showRoleModuleById(res, req) {
    try {
      const [result] = await connect.query('SELECT * FROM role_modules WHERE RoleModules_id = ?', [req.params.id]);
      if (result.length === 0) return res.status(404).json({ error: "Role Module not found" });
      res.status(200).json(result[0]);
    } catch (error) {
      res.status(500).json({ error: "Error fetching Role Module", details: error.message });
    }
  }

  /**
   * The function `showRoleModuleByRole` fetches role_modules from a database by role ID and returns them as a JSON
   * response, handling errors appropriately.
   * @param res - The `res` parameter in the `showRoleModuleByRole` function is typically used to send the HTTP
   * response back to the client. It is an object that represents the response that an Express.js route
   * handler function sends when it receives an HTTP request. The `res` object has methods like `status()`
   * @param req - The `req` parameter typically represents the request object in a Node.js application.
   * It contains information about the HTTP request made by the client, such as the request URL,
   * headers, parameters, and body. In this context, `req.params.id` is likely referring to a route
   * parameter named `id
   * @returns If the role_modules with the specified role ID exist in the database, the function will return them
   * in a JSON format with a status code of 200. If no role_modules are found (result length is 0), it will 
   * return a JSON response with a status code 404 indicating that no role_modules were found.
   */
  async showRoleModuleByRole(res, req) {
    try {
      const [result] = await connect.query('SELECT * FROM role_modules WHERE Roles_fk = ?', [req.params.id]);
      if (result.length === 0) return res.status(404).json({ error: "Role Modules not found" });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Error fetching Role Modules", details: error.message });
    }
  }

}

export default RoleModuleModel;
