/**
*Author: 	DIEGO CASALLAS
 *Date:		01/01/2026  
 *Description:	Controller for role module-related API operations - NODEJS
 **/

import RoleModuleModel from '../models/roleModule.model.js';

/**
 * The function `showRoleModule` fetches and displays role_modules, handling any errors that may occur.
 * @param req - The `req` parameter typically represents the request object in Node.js applications. It
 * contains information about the HTTP request that triggered the function, such as headers,
 * parameters, body, and more. In this context, it is likely used to pass the request object to the
 * `showRoleModule` function for processing
 * @param res - The `res` parameter in the `showRoleModule` function is typically the response object in an
 * Express route handler. It is used to send a response back to the client making the request. In this
 * case, it is being used to send a JSON response with an error message if there is an error
 */
export const showRoleModule = async (req, res) => {
  try {
    const roleModuleModel = new RoleModuleModel();
    roleModuleModel.showRoleModule(res);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Role Modules", details: error.message });
  }
};

/**
 * The function `showRoleModuleId` fetches a role_module by its ID and handles any errors that occur during the
 * process.
 * @param req - The `req` parameter typically represents the request object in Node.js applications. It
 * contains information about the HTTP request made by the client, such as headers,
 * parameters, body content, and more. In this context, `req` is likely being used to pass the request
 * object to the `showRoleModuleId
 * @param res - The `res` parameter in the `showRoleModuleId` function is typically the response object in an
 * Express route handler. It is used to send a response back to the client making the request.
 */
export const showRoleModuleId = async (req, res) => {
  try {
    const roleModuleModel = new RoleModuleModel();
    roleModuleModel.showRoleModuleById(res, req);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Role Module", details: error.message });
  }
};

/**
 * The function `showRoleModuleByRoleId` fetches role_modules by role ID and handles any errors that occur during the
 * process.
 * @param req - The `req` parameter typically represents the request object in Node.js applications. It
 * contains information about the HTTP request made by the client, such as headers,
 * parameters, body content, and more. In this context, `req` is likely being used to pass the request
 * object to the `showRoleModuleByRoleId
 * @param res - The `res` parameter in the `showRoleModuleByRoleId` function is typically the response object in an
 * Express route handler. It is used to send a response back to the client making the request.
 */
export const showRoleModuleByRoleId = async (req, res) => {
  try {
    const roleModuleModel = new RoleModuleModel();
    roleModuleModel.showRoleModuleByRole(res, req);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Role Modules", details: error.message });
  }
};

/**
 * The function `addRoleModule` creates a new RoleModuleModel instance and calls the `addRoleModule` method on it with
 * the provided request and response objects, handling any errors that occur.
 * @param req - The `req` parameter typically represents the request object in an Express.js
 * application. It contains information about the HTTP request that triggered the function, such as
 * headers, parameters, body, and query parameters. In this context, it is being passed to the
 * `addRoleModule` function to provide necessary data for
 * @param res - The `res` parameter in the `addRoleModule` function is typically used to send a response back
 * to the client making the request. It is an object that represents the HTTP response that an
 * Express.js route sends when it gets an HTTP request. You can use methods on this object, such as `
 */
export const addRoleModule = async (req, res) => {
  try {
    const roleModuleModel = new RoleModuleModel();
    roleModuleModel.addRoleModule(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error adding Role Module", details: error.message });
  }
};

/**
 * The function `updateRoleModule` updates a role_module using a RoleModuleModel instance and handles errors by sending a
 * 500 status response with an error message.
 * @param req - The `req` parameter typically represents the request object in an Express.js
 * application. This object includes properties such as headers, parameters, query strings, and the request body.
 * @param res - The `res` parameter in the `updateRoleModule` function is typically the response object in
 * Node.js, which is used to send a response back to the client making the request. It contains methods
 * and properties that allow you to control what data is sent back to the client, such as setting the
 * status
 */

export const updateRoleModule = async (req, res) => {
  try {
    const roleModuleModel = new RoleModuleModel();
    roleModuleModel.updateRoleModule(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error updating Role Module", details: error.message });
  }
};

/**
 * The function `deleteRoleModule` attempts to delete a role_module using a RoleModuleModel instance and handles any
 * errors that occur.
 * @param req - The `req` parameter typically represents the request object in Node.js applications. It
 * contains information about the HTTP request made by the client, such as headers, parameters,
 * body, and more, depending on the type of request being made.
 * @param res - The `res` parameter in the `deleteRoleModule` function is typically the response object in an
 * Express.js route handler. It is used to send a response back to the client making the request.
 */
export const deleteRoleModule = async (req, res) => {
  try {
    const roleModuleModel = new RoleModuleModel();
    roleModuleModel.deleteRoleModule(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error deleting Role Module", details: error.message });
  }
};
