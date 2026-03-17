/**
*Author: 	DIEGO CASALLAS
*Date:		01/01/2026  
*Description:	This code defines a middleware function `verifyToken` that is used to authenticate requests by verifying a JSON Web Token (JWT) provided in the request's "Authorization" header. If the token is valid, the decoded user information is attached to the request object, allowing subsequent middleware or route handlers to access it. If the token is missing or invalid, an appropriate error response is sent back to the client.
**/

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Middleware to verify the token
/**
 * The function `verifyToken` checks the validity of a token in the request header and verifies it
 * using a JWT secret key before allowing access to the next middleware.
 * @param req - The `req` parameter in the `verifyToken` function stands for the request object. It
 * contains information about the HTTP request that is being made, such as headers, parameters, body,
 * etc. In this function, `req.header("Authorization")` is used to extract the authorization token from
 * the
 * @param res - The `res` parameter in the `verifyToken` function is the response object that will be
 * used to send responses back to the client making the request. It is typically used to send HTTP
 * responses with status codes and data in JSON format. In the provided code snippet, `res` is used to
 * @param next - The `next` parameter in the `verifyToken` function is a callback function that is used
 * to pass control to the next middleware function in the stack. When called, it passes the control to
 * the next middleware function. This is commonly used in Express.js middleware functions to move to
 * the next function in
 * @returns If there is no token present in the request header, a response with status code 401 and a
 * JSON object containing an error message "Access denied" will be returned. If the token is present
 * but invalid, a response with status code 400 and a JSON object containing an error message "Invalid
 * Token" will be returned. If the token is successfully verified, the function will call the `next()`
 */
export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = verified;
    //See data token encrypted
    //console.log(verified);
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid Token" });
  }
};
