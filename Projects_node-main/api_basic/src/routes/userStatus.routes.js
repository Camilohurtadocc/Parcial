/**
*Author: 	DIEGO CASALLAS
*Date:		01/01/2026  
*Description:	This file defines the routes for user status management. It includes routes for creating, retrieving, updating, and deleting user statuses. The routes are handled by the corresponding controller functions imported from 'userStatus.controller.js'.
**/
import {Router} from 'express';
import {showUserStatus,showUserStatusId,addUserStatus,updateUserStatus,deleteUserStatus} from '../controllers/userStatus.controller.js';
import { verifyToken } from '../middleware/authMiddleware.js';
const router=Router();
const apiName='/userStatus';

router.route(apiName)
  .get(verifyToken,showUserStatus)  // Get all UserStatus
  .post(verifyToken,addUserStatus); // Add UserStatus

router.route(`${apiName}/:id`)
  .get(verifyToken,showUserStatusId)  // Get UserStatus by Id
  .put(verifyToken,updateUserStatus)  // Update UserStatus by Id
  .delete(verifyToken,deleteUserStatus); // Delete UserStatus by Id

export default router;