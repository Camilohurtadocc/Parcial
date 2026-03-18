/**
*Author: 	DIEGO CASALLAS
*Date:		01/01/2026  
*Description:	This file defines the routes for user status management. It includes routes for creating, retrieving, updating, and deleting user statuses. The routes are handled by the corresponding controller functions imported from 'userStatus.controller.js'.
**/
import {Router} from 'express';
import {showUserStatus,showUserStatusId,addUserStatus,updateUserStatus,deleteUserStatus} from '../controllers/userStatus.controller.js';
const router=Router();
const apiName='/userStatus';

router.route(apiName)
  .get(showUserStatus)  // Get all UserStatus
  .post(addUserStatus); // Add UserStatus

router.route(`${apiName}/:id`)
  .get(showUserStatusId)  // Get UserStatus by Id
  .put(updateUserStatus)  // Update UserStatus by Id
  .delete(deleteUserStatus); // Delete UserStatus by Id

export default router;