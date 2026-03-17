
/**
*Author: 	DIEGO CASALLAS
*Date:		01/01/2026  
*Description:	Controller for user status-related operations - NODEJS
**/
import UserStatusModel from '../models/userStatus.model.js';

/**
 * The function `showUserStatus` fetches and displays a user's status, handling any errors that may
 * occur.
 * @param req - The `req` parameter typically represents the request object in Node.js applications. It
 * contains information about the HTTP request that triggered the function, such as headers,
 * parameters, body content, and more. In this context, it is used as an input parameter for the
 * `showUserStatus` function to handle
 * @param res - The `res` parameter in the `showUserStatus` function is typically the response object
 * in Node.js Express framework. It is used to send a response back to the client making the request.
 */
export const showUserStatus = async (req, res) => {
  try {
    const userStatusModel = new UserStatusModel();
    userStatusModel.showUserStatus(res);
  } catch (error) {
    res.status(500).json({ error: "Error fetching User Status", details: error.message });
  }
};

/**
 * The function `showUserStatusId` fetches and displays a user's status ID, handling any errors that
 * may occur.
 * @param req - The `req` parameter typically represents the request object in Node.js applications. It
 * contains information about the HTTP request that triggered the function, such as headers,
 * parameters, body content, and more. In this context, `req` is likely being used to pass the request
 * object to the `showUser
 * @param res - The `res` parameter in the `showUserStatusId` function is typically used to send a
 * response back to the client in an Express route handler. It represents the HTTP response object,
 * which allows you to send data, set headers, and end the response.
 */
export const showUserStatusId = async (req, res) => {
  try {
    const userStatusModel = new UserStatusModel();
    userStatusModel.showUserStatusId(res, req);
  } catch (error) {
    res.status(500).json({ error: "Error fetching UserStatus", details: error.message });
  }
};

/**
 * The function `addUserStatus` is an asynchronous function that adds a user status using a
 * `UserStatusModel` instance.
 * @param req - The `req` parameter typically represents the request object in Node.js applications. It
 * contains information about the HTTP request that triggered the function, such as headers,
 * parameters, body content, and more. In this context, `req` is likely being used to pass the request
 * object to the `addUser
 * @param res - The `res` parameter in the `addUserStatus` function is typically used to send a
 * response back to the client making the request. It is an object representing the HTTP response that
 * the server sends back to the client. In this context, it is used to send a response with status code
 */
export const addUserStatus = async (req, res) => {
  try {
    const userStatusModel = new UserStatusModel();
    userStatusModel.addUserStatus(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error adding UserStatus", details: error.message });
  }
};

/**
 * The function updateUserStatus updates the user status using a UserStatusModel instance and handles
 * any errors that occur.
 * @param req - The `req` parameter typically represents the request object in Node.js applications. It
 * contains information about the HTTP request that triggered the function, such as headers,
 * parameters, body content, and more. In this context, `req` is likely being used to pass the request
 * object to the `updateUser
 * @param res - The `res` parameter in the `updateUserStatus` function is typically used to send a
 * response back to the client making the request. It is an object that represents the HTTP response
 * that an Express.js route handler sends when it gets an HTTP request. You can use methods on the
 * `res`
 */
export const updateUserStatus = async (req, res) => {
  try {
    const userStatusModel = new UserStatusModel();
    userStatusModel.updateUserStatus(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error updating UserStatus", details: error.message });
  }
};

/**
 * The function deleteUserStatus deletes a user status using a UserStatusModel instance and handles any
 * errors that occur.
 * @param req - The `req` parameter typically represents the request object in Node.js applications. It
 * contains information about the HTTP request that triggered the function. This object includes
 * properties such as headers, parameters, body, and more, depending on the type of request being made.
 * In this context, `req` is likely
 * @param res - The `res` parameter in the `deleteUserStatus` function is typically used to send a
 * response back to the client making the request. It is an instance of the response object in
 * Express.js, which allows you to send HTTP responses with data or status codes. In this context,
 * `res`
 */
export const deleteUserStatus = async (req, res) => {
  try {
    const userStatusModel = new UserStatusModel();
    userStatusModel.deleteUserStatus(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error deleting UserStatus", details: error.message });
  }
};


