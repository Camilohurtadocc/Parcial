/**
*Author: 	DIEGO CASALLAS
 *Date:		01/01/2026   
 *Description: This file defines the routes for perfil management. It includes routes for creating, retrieving, updating, and deleting perfils. The routes are handled by the corresponding controller functions imported from 'perfil.controller.js'.	
 **/
import {Router} from 'express';
import {showPerfil,showPerfilId,addPerfil,updatePerfil,deletePerfil} from '../controllers/perfil.controller.js';

const router=Router();
const apiName='/perfil';

router.route(apiName)
  .get(showPerfil)  // Get all Perfil
  .post(addPerfil); // Add Perfil

router.route(`${apiName}/:id`)
  .get(showPerfilId)  // Get Perfil by Id
  .put(updatePerfil)  // Update Perfil by Id
  .delete(deletePerfil); // Delete Perfil by Id

export default router;
