/**
*Author: 	DIEGO CASALLAS
 *Date:		01/01/2026   
 *Description: This file defines the routes for role module management. It includes routes for creating, retrieving, updating, and deleting role modules. The routes are handled by the corresponding controller functions imported from 'roleModule.controller.js'.	
 **/
import {Router} from 'express';
import {showRoleModule,showRoleModuleId,showRoleModuleByRoleId,addRoleModule,updateRoleModule,deleteRoleModule} from '../controllers/roleModule.controller.js';

const router=Router();
const apiName='/rolo_module';

router.route(apiName)
  .get(showRoleModule)  // Get all Role Modules
  .post(addRoleModule); // Add Role Module

router.route(`${apiName}/:id`)
  .get(showRoleModuleId)  // Get Role Module by Id
  .put(updateRoleModule)  // Update Role Module by Id
  .delete(deleteRoleModule); // Delete Role Module by Id

router.route(`${apiName}/role/:id`)
  .get(showRoleModuleByRoleId); // Get Role Modules by Role Id

export default router;
