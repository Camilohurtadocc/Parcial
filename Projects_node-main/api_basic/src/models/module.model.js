/**
*Author: 	DIEGO CASALLAS
 *Date:		01/01/2026  
 *Description:	This code defines a `ModuleModel` class that provides methods for managing modules in a database. The class includes methods for adding a new module, updating an existing module, deleting a module, showing all modules, and showing a module by ID. Each method interacts with the database using SQL queries and handles errors appropriately, returning JSON responses with relevant status codes and messages.
 **/
import { connect } from '../config/db/connect.js';

class ModuleModel {
  constructor(id, name, description, route, icon, submodule, parentModule) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.route = route;
    this.icon = icon;
    this.submodule = submodule;
    this.parentModule = parentModule;
  }

  /**
   * The function `addModule` is an asynchronous function that adds a new module to a database table based
   * on the provided name, description, route, icon, submodule and parentModule, handling errors appropriately.
   * @param req - The `req` parameter in the `addModule` function likely represents the request object in
   * a Node.js application using Express or a similar framework. This object contains information about
   * the HTTP request that triggered the function, including details such as the request body, headers,
   * parameters, and more.
   * @param res - The `res` parameter in the `addModule` function is the response object that is used to
   * send a response back to the client making the request. It is typically provided by the Express.js
   * framework in Node.js and contains methods like `res.status()` and `res.json()` to send HTTP status
   * @returns If the `name` field is missing in the request body, a response with
   * status code 400 and a JSON object containing an error message "Missing required fields" will be
   * returned.
   */
  async addModule(req, res) {
    try {
      const { name, description, route, icon, submodule, parentModule } = req.body;
      if (!name) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      let sqlQuery = "INSERT INTO modules (Modules_name,Modules_description,Modules_route,Modules_icon,Modules_submodule,Modules_parent_module) VALUES (?,?,?,?,?,?)";
      const [result] = await connect.query(sqlQuery, [name, description, route, icon, submodule || 0, parentModule || null]);
      res.status(201).json({
        data: [{ id: result.insertId, name, description, route, icon, submodule, parentModule }],
        status: 201
      });
    } catch (error) {
      res.status(500).json({ error: "Error adding Module", details: error.message });
    }
  }

  /**
   * The function `updateModule` updates a module in a database based on the provided name, description, route, icon, submodule and parentModule,
   * handling errors and returning appropriate responses.
   * @param req - The `req` parameter in the `updateModule` function is typically an object representing
   * the HTTP request. It contains information about the request made to the server, such as the request
   * body, parameters, headers, and more. In this specific function, `req` is used to access the request
   * body
   * @param res - The `res` parameter in the `updateModule` function is the response object that will be
   * used to send a response back to the client making the request. It is typically used to set the
   * status code, send data, and end the response. In this function, `res` is used to
   * @returns The `updateModule` function returns a JSON response with the following structure:
   */
  async updateModule(req, res) {
    try {
      const { name, description, route, icon, submodule, parentModule } = req.body;
      if (!name) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      let sqlQuery = "UPDATE modules SET Modules_name=?,Modules_description=?,Modules_route=?,Modules_icon=?,Modules_submodule=?,Modules_parent_module=?,updated_at=? WHERE Modules_id= ?";
      const update_at = new Date().toLocaleString("en-CA", { timeZone: "America/Bogota" }).replace(",", "").replace("/", "-").replace("/", "-");
      const [result] = await connect.query(sqlQuery, [name, description, route, icon, submodule, parentModule, update_at, req.params.id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: "Module not found" });
      res.status(200).json({
        data: [{ name, description, route, icon, submodule, parentModule, update_at }],
        status: 200,
        updated: result.affectedRows
      });
    } catch (error) {
      res.status(500).json({ error: "Error updating Module", details: error.message });
    }
  }

  /**
   * The function `deleteModule` deletes a module from a database table based on the provided module ID and
   * returns a response indicating the success or failure of the deletion operation.
   * @param req - The `req` parameter typically represents the HTTP request in a Node.js application. It
   * contains information about the request made by the client, such as the request headers, parameters,
   * body, and more. In this specific function `deleteModule`, `req` is likely an object that contains
   * the parameters
   * @param res - The `res` parameter in the `deleteModule` function is the response object that will be
   * used to send a response back to the client making the request. It is typically used to send HTTP
   * responses with status codes, headers, and data back to the client.
   * @returns If the module is successfully deleted, a JSON response with status code 200 will be
   * returned, containing an empty data array, a status of 200, and the number of rows deleted. If the
   * module is not found, a JSON response with status code 404 will be returned, indicating that the module
   * was not found. If an error occurs during the deletion process, a JSON response with status code 500
   */
  async deleteModule(req, res) {
    try {
      let sqlQuery = "DELETE FROM modules WHERE Modules_id = ?";
      const [result] = await connect.query(sqlQuery, [req.params.id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: "Module not found" });
      res.status(200).json({
        data: [],
        status: 200,
        deleted: result.affectedRows
      });
    } catch (error) {
      res.status(500).json({ error: "Error deleting Module", details: error.message });
    }
  }

  /**
   * The function `showModule` fetches all modules from a database and returns them as a JSON response,
   * handling errors if they occur.
   * @param res - The `res` parameter in the `showModule` function is typically the response object in a
   * Node.js application. It is used to send the HTTP response back to the client making the request.
   */
  async showModule(res) {
    try {
      let sqlQuery = "SELECT * FROM modules";
      const [result] = await connect.query(sqlQuery);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Error fetching Modules", details: error.message });
    }
  }

  /**
   * The function `showModuleById` fetches a module from a database by its ID and returns it as a JSON
   * response, handling errors appropriately.
   * @param res - The `res` parameter in the `showModuleById` function is typically used to send the HTTP
   * response back to the client. It is an object that represents the response that an Express.js route
   * handler function sends when it receives an HTTP request. The `res` object has methods like `status()`
   * @param req - The `req` parameter typically represents the request object in a Node.js application.
   * It contains information about the HTTP request made by the client, such as the request URL,
   * headers, parameters, and body. In this context, `req.params.id` is likely referring to a route
   * parameter named `id
   * @returns If the module with the specified ID exists in the database, the function will return the
   * details of that module in a JSON format with a status code of 200. If the module is not found (result
   * length is 0), it will return a JSON response with a status code 404 indicating that the module
   * was not found. If an error occurs during the database query, it will return a
   */
  async showModuleById(res, req) {
    try {
      const [result] = await connect.query('SELECT * FROM modules WHERE Modules_id = ?', [req.params.id]);
      if (result.length === 0) return res.status(404).json({ error: "Module not found" });
      res.status(200).json(result[0]);
    } catch (error) {
      res.status(500).json({ error: "Error fetching Module", details: error.message });
    }
  }

}

export default ModuleModel;
