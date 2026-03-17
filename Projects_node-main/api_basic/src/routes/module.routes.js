/**
*Author: 	DIEGO CASALLAS
 *Date:		01/01/2026   
 *Description: This file defines the routes for module management. It includes routes for creating, retrieving, updating, and deleting modules. The routes are handled by the corresponding controller functions imported from 'module.controller.js'.	
 **/
import {Router} from 'express';
import {showModule,showModuleId,addModule,updateModule,deleteModule} from '../controllers/module.controller.js';

const router=Router();
const apiName='/module';

router.route(apiName)
  .get(showModule)  // Get all Module
  .post(addModule); // Add Module

router.route(`${apiName}/:id`)
  .get(showModuleId)  // Get Module by Id
  .put(updateModule)  // Update Module by Id
  .delete(deleteModule); // Delete Module by Id

export default router;
