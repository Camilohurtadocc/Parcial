/**
*Author: 	DIEGO CASALLAS
*Date:		01/01/2026  
*Description:	Index file for the API - NODEJS
**/
import app from './app/app.js';
import dotenv from 'dotenv';

dotenv.config({path:'../.env'});
const PORT = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3000; // Allow dynamic port configuration

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
