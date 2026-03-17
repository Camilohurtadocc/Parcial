/**
*Author: 	DIEGO CASALLAS
*Date:		01/01/2026  
*Description:	This file defines the routes for authentication. It includes the login route.
**/
import { Router } from 'express';
import { loginApiUser } from '../controllers/apiUser.controller.js';

const router = Router();

router.route('/auth/login')
  .post(loginApiUser); // Login

export default router;
