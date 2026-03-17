/**
*Author: 	DIEGO CASALLAS
 *Date:		01/01/2026  
 *Description:	Controller for module-related API operations - NODEJS
 **/

import ModuleModel from '../models/module.model.js';

/**
 * The function `showModule` fetches and displays modules, handling any errors that may occur.
 * @param req - The `req` parameter typically represents the request object in Node.js applications. It
 * contains information about the HTTP request that triggered the function, such as headers,
 * parameters, body, and more. In this context, it is likely used to pass the request object to the
 * `showModule` function for processing
 * @param res - The `res` parameter in the `showModule` function is typically the response object in an
 * Express route handler. It is used to send a response back to the client making the request. In this
 * case, it is being used to send a JSON response with an error message if there is an error
 */
export const showModule = async (req, res) => {
  try {
    const moduleModel = new ModuleModel();
    moduleModel.showModule(res);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Modules", details: error.message });
  }
};

/**
 * The function `showModuleId` fetches a module by its ID and handles any errors that occur during the
 * process.
 * @param req - The `req` parameter typically represents the request object in Node.js applications. It
 * contains information about the HTTP request made by the client, such as headers,
 * parameters, body content, and more. In this context, `req` is likely being used to pass the request
 * object to the `showModuleId
 * @param res - The `res` parameter in the `showModuleId` function is typically the response object in an
 * Express route handler. It is used to send a response back to the client making the request.
 */
export const showModuleId = async (req, res) => {
  try {
    const moduleModel = new ModuleModel();
    moduleModel.showModuleById(res, req);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Module", details: error.message });
  }
};

/**
 * The function `addModule` creates a new ModuleModel instance and calls the `addModule` method on it with
 * the provided request and response objects, handling any errors that occur.
 * @param req - The `req` parameter typically represents the request object in an Express.js
 * application. It contains information about the HTTP request that triggered the function, such as
 * headers, parameters, body, and query parameters. In this context, it is being passed to the
 * `addModule` function to provide necessary data for
 * @param res - The `res` parameter in the `addModule` function is typically used to send a response back
 * to the client making the request. It is an object that represents the HTTP response that an
 * Express.js route sends when it gets an HTTP request. You can use methods on this object, such as `
 */
export const addModule = async (req, res) => {
  try {
    const moduleModel = new ModuleModel();
    moduleModel.addModule(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error adding Module", details: error.message });
  }
};

/**
 * The function `updateModule` updates a module using a ModuleModel instance and handles errors by sending a
 * 500 status response with an error message.
 * @param req - The `req` parameter typically represents the request object in an Express.js
 * application. This object includes properties such as headers, parameters, query strings, and the request body.
 * @param res - The `res` parameter in the `updateModule` function is typically the response object in
 * Node.js, which is used to send a response back to the client making the request. It contains methods
 * and properties that allow you to control what data is sent back to the client, such as setting the
 * status
 */

export const updateModule = async (req, res) => {
  try {
    const moduleModel = new ModuleModel();
    moduleModel.updateModule(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error updating Module", details: error.message });
  }
};

/**
 * The function `deleteModule` attempts to delete a module using a ModuleModel instance and handles any
 * errors that occur.
 * @param req - The `req` parameter typically represents the request object in Node.js applications. It
 * contains information about the HTTP request made by the client, such as headers, parameters,
 * body, and more, depending on the type of request being made.
 * @param res - The `res` parameter in the `deleteModule` function is typically the response object in an
 * Express.js route handler. It is used to send a response back to the client making the request.
 */
export const deleteModule = async (req, res) => {
  try {
    const moduleModel = new ModuleModel();
    moduleModel.deleteModule(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error deleting Module", details: error.message });
  }
};
