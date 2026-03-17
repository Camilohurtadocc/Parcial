/**
*Author: 	DIEGO CASALLAS
 *Date:		01/01/2026  
 *Description:	Controller for perfil-related API operations - NODEJS
 **/

import PerfilModel from '../models/perfil.model.js';

/**
 * The function `showPerfil` fetches and displays perfils, handling any errors that may occur.
 * @param req - The `req` parameter typically represents the request object in Node.js applications. It
 * contains information about the HTTP request that triggered the function, such as headers,
 * parameters, body, and more. In this context, it is likely used to pass the request object to the
 * `showPerfil` function for processing
 * @param res - The `res` parameter in the `showPerfil` function is typically the response object in an
 * Express route handler. It is used to send a response back to the client making the request. In this
 * case, it is being used to send a JSON response with an error message if there is an error
 */
export const showPerfil = async (req, res) => {
  try {
    const perfilModel = new PerfilModel();
    perfilModel.showPerfil(res);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Perfils", details: error.message });
  }
};

/**
 * The function `showPerfilId` fetches a perfil by its ID and handles any errors that occur during the
 * process.
 * @param req - The `req` parameter typically represents the request object in Node.js applications. It
 * contains information about the HTTP request made by the client, such as headers,
 * parameters, body content, and more. In this context, `req` is likely being used to pass the request
 * object to the `showPerfilId
 * @param res - The `res` parameter in the `showPerfilId` function is typically the response object in an
 * Express route handler. It is used to send a response back to the client making the request.
 */
export const showPerfilId = async (req, res) => {
  try {
    const perfilModel = new PerfilModel();
    perfilModel.showPerfilById(res, req);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Perfil", details: error.message });
  }
};

/**
 * The function `addPerfil` creates a new PerfilModel instance and calls the `addPerfil` method on it with
 * the provided request and response objects, handling any errors that occur.
 * @param req - The `req` parameter typically represents the request object in an Express.js
 * application. It contains information about the HTTP request that triggered the function, such as
 * headers, parameters, body, and query parameters. In this context, it is being passed to the
 * `addPerfil` function to provide necessary data for
 * @param res - The `res` parameter in the `addPerfil` function is typically used to send a response back
 * to the client making the request. It is an object that represents the HTTP response that an
 * Express.js route sends when it gets an HTTP request. You can use methods on this object, such as `
 */
export const addPerfil = async (req, res) => {
  try {
    const perfilModel = new PerfilModel();
    perfilModel.addPerfil(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error adding Perfil", details: error.message });
  }
};

/**
 * The function `updatePerfil` updates a perfil using a PerfilModel instance and handles errors by sending a
 * 500 status response with an error message.
 * @param req - The `req` parameter typically represents the request object in an Express.js
 * application. This object includes properties such as headers, parameters, query strings, and the request body.
 * @param res - The `res` parameter in the `updatePerfil` function is typically the response object in
 * Node.js, which is used to send a response back to the client making the request. It contains methods
 * and properties that allow you to control what data is sent back to the client, such as setting the
 * status
 */

export const updatePerfil = async (req, res) => {
  try {
    const perfilModel = new PerfilModel();
    perfilModel.updatePerfil(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error updating Perfil", details: error.message });
  }
};

/**
 * The function `deletePerfil` attempts to delete a perfil using a PerfilModel instance and handles any
 * errors that occur.
 * @param req - The `req` parameter typically represents the request object in Node.js applications. It
 * contains information about the HTTP request made by the client, such as headers, parameters,
 * body, and more, depending on the type of request being made.
 * @param res - The `res` parameter in the `deletePerfil` function is typically the response object in an
 * Express.js route handler. It is used to send a response back to the client making the request.
 */
export const deletePerfil = async (req, res) => {
  try {
    const perfilModel = new PerfilModel();
    perfilModel.deletePerfil(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error deleting Perfil", details: error.message });
  }
};
