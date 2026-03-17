/**
*Author: 	DIEGO CASALLAS
 *Date:		01/01/2026  
 *Description:	This code defines a `PerfilModel` class that provides methods for managing perfils in a database. The class includes methods for adding a new perfil, updating an existing perfil, deleting a perfil, showing all perfils, and showing a perfil by ID. Each method interacts with the database using SQL queries and handles errors appropriately, returning JSON responses with relevant status codes and messages.
 **/
import { connect } from '../config/db/connect.js';

class PerfilModel {
  constructor(id, name, email, photo, userIdFk) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.photo = photo;
    this.userIdFk = userIdFk;
  }

  /**
   * The function `addPerfil` is an asynchronous function that adds a new perfil to a database table based
   * on the provided name and description, handling errors appropriately.
   * @param req - The `req` parameter in the `addPerfil` function likely represents the request object in
   * a Node.js application using Express or a similar framework. This object contains information about
   * the HTTP request that triggered the function, including details such as the request body, headers,
   * parameters, and more.
   * @param res - The `res` parameter in the `addPerfil` function is the response object that is used to
   * send a response back to the client making the request. It is typically provided by the Express.js
   * framework in Node.js and contains methods like `res.status()` and `res.json()` to send HTTP status
   * @returns If the `name` field is missing in the request body, a response with
   * status code 400 and a JSON object containing an error message "Missing required fields" will be
   * returned.
   */
  async addPerfil(req, res) {
    try {
      const { name, email, photo, userIdFk } = req.body;
      if (!name || !email) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      let sqlQuery = "INSERT INTO profiles (Profile_name, Profile_email, Profile_photo, User_id_fk) VALUES (?,?,?,?)";
      const [result] = await connect.query(sqlQuery, [name, email, photo, userIdFk]);
      res.status(201).json({
        data: [{ id: result.insertId, name, email, photo, userIdFk }],
        status: 201
      });
    } catch (error) {
      res.status(500).json({ error: "Error adding Profile", details: error.message });
    }
  }

  /**
   * The function `updatePerfil` updates a perfil in a database based on the provided name and description,
   * handling errors and returning appropriate responses.
   * @param req - The `req` parameter in the `updatePerfil` function is typically an object representing
   * the HTTP request. It contains information about the request made to the server, such as the request
   * body, parameters, headers, and more. In this specific function, `req` is used to access the request
   * body
   * @param res - The `res` parameter in the `updatePerfil` function is the response object that will be
   * used to send a response back to the client making the request. It is typically used to set the
   * status code, send data, and end the response. In this function, `res` is used to
   * @returns The `updatePerfil` function returns a JSON response with the following structure:
   */
  async updatePerfil(req, res) {
    try {
      const { name, email, photo, userIdFk } = req.body;
      
      // Verificar que al menos un campo esté presente
      if (!name && !email && !photo && !userIdFk) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      
      // Obtener el perfil actual para preservar valores no proporcionados
      const [currentProfile] = await connect.query(
        'SELECT Profile_name, Profile_email, Profile_photo, User_id_fk FROM profiles WHERE Profile_id = ?', 
        [req.params.id]
      );
      
      if (currentProfile.length === 0) {
        return res.status(404).json({ error: "Profile not found" });
      }
      
      // Usar valores actuales si no se proporcionan nuevos valores
      const newName = name || currentProfile[0].Profile_name;
      const newEmail = email || currentProfile[0].Profile_email;
      const newPhoto = photo !== undefined ? photo : currentProfile[0].Profile_photo;
      const newUserIdFk = userIdFk !== undefined ? userIdFk : currentProfile[0].User_id_fk;
      
      let sqlQuery = "UPDATE profiles SET Profile_name=?, Profile_email=?, Profile_photo=?, User_id_fk=?, updated_at=? WHERE Profile_id = ?";
      const updatedAt = new Date().toISOString();
      const [result] = await connect.query(sqlQuery, [newName, newEmail, newPhoto, newUserIdFk, updatedAt, req.params.id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: "Profile not found" });
      res.status(200).json({
        data: [{ name: newName, email: newEmail, photo: newPhoto, userIdFk: newUserIdFk, updated_at: updatedAt }],
        status: 200,
        updated: result.affectedRows
      });
    } catch (error) {
      res.status(500).json({ error: "Error updating Profile", details: error.message });
    }
  }

  /**
   * The function `deletePerfil` deletes a perfil from a database table based on the provided perfil ID and
   * returns a response indicating the success or failure of the deletion operation.
   * @param req - The `req` parameter typically represents the HTTP request in a Node.js application. It
   * contains information about the request made by the client, such as the request headers, parameters,
   * body, and more. In this specific function `deletePerfil`, `req` is likely an object that contains
   * the parameters
   * @param res - The `res` parameter in the `deletePerfil` function is the response object that will be
   * used to send a response back to the client making the request. It is typically used to send HTTP
   * responses with status codes, headers, and data back to the client.
   * @returns If the perfil is successfully deleted, a JSON response with status code 200 will be
   * returned, containing an empty data array, a status of 200, and the number of rows deleted. If the
   * perfil is not found, a JSON response with status code 404 will be returned, indicating that the perfil
   * was not found. If an error occurs during the deletion process, a JSON response with status code 500
   */
  async deletePerfil(req, res) {
    try {
      let sqlQuery = "DELETE FROM profiles WHERE Profile_id = ?";
      const [result] = await connect.query(sqlQuery, [req.params.id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: "Profile not found" });
      res.status(200).json({
        data: [],
        status: 200,
        deleted: result.affectedRows
      });
    } catch (error) {
      res.status(500).json({ error: "Error deleting Profile", details: error.message });
    }
  }

  /**
   * The function `showPerfil` fetches all perfils from a database and returns them as a JSON response,
   * handling errors if they occur.
   * @param res - The `res` parameter in the `showPerfil` function is typically the response object in a
   * Node.js application. It is used to send the HTTP response back to the client making the request.
   */
  async showPerfil(res) {
    try {
      let sqlQuery = "SELECT * FROM profiles";
      const [result] = await connect.query(sqlQuery);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Error fetching Profiles", details: error.message });
    }
  }

  /**
   * The function `showPerfilById` fetches a perfil from a database by its ID and returns it as a JSON
   * response, handling errors appropriately.
   * @param res - The `res` parameter in the `showPerfilById` function is typically used to send the HTTP
   * response back to the client. It is an object that represents the response that an Express.js route
   * handler function sends when it receives an HTTP request. The `res` object has methods like `status()`
   * @param req - The `req` parameter typically represents the request object in a Node.js application.
   * It contains information about the HTTP request made by the client, such as the request URL,
   * headers, parameters, and body. In this context, `req.params.id` is likely referring to a route
   * parameter named `id
   * @returns If the perfil with the specified ID exists in the database, the function will return the
   * details of that perfil in a JSON format with a status code of 200. If the perfil is not found (result
   * length is 0), it will return a JSON response with a status code 404 indicating that the perfil
   * was not found. If an error occurs during the database query, it will return a
   */
  async showPerfilById(res, req) {
    try {
      const [result] = await connect.query('SELECT * FROM profiles WHERE Profile_id = ?', [req.params.id]);
      if (result.length === 0) return res.status(404).json({ error: "Profile not found" });
      res.status(200).json(result[0]);
    } catch (error) {
      res.status(500).json({ error: "Error fetching Profile", details: error.message });
    }
  }

}

export default PerfilModel;
