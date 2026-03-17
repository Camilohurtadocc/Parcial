/**
*Author: 	DIEGO CASALLAS
*Date:		01/01/2026  
*Description: This code provides two asynchronous functions, `encryptPassword` and `comparePassword`, for securely handling passwords using the bcrypt library. The `encryptPassword` function takes a plain text password and returns its hashed version, while the `comparePassword` function checks if a given plain text password matches a previously hashed password. Both functions include error handling to log any issues that may arise during the hashing or comparison process.
**/
import appBcrypt from 'bcrypt';
const saltRounds = 10;

/**
 * The function `encryptPassword` asynchronously hashes a given password using bcrypt with a specified
 * number of salt rounds.
 * @param password - The `password` parameter is the plain text password that needs to be encrypted
 * before storing it securely.
 * @returns The `encryptPassword` function returns the hashed password after encrypting it using bcrypt
 * with the specified salt rounds.
 */
export const encryptPassword = async (password) => {
    try {
        const hashedPassword = await appBcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error encrypt:', error);
        throw error;
    }
};
/**
 * The function `comparePassword` compares a plain text password with a hashed password using bcrypt.
 * @param password - The `password` parameter is the plain text password that needs to be compared with
 * the hashed password.
 * @param hashedPassword - The `hashedPassword` parameter is the hashed version of a password that has
 * been previously stored in a database or elsewhere for security purposes. It is typically generated
 * using a cryptographic hashing algorithm like bcrypt to securely store and compare passwords without
 * storing the actual plain text password.
 * @returns The `comparePassword` function returns a boolean value indicating whether the provided
 * `password` matches the `hashedPassword`.
 */
export const comparePassword = async (password, hashedPassword) => {
    try {
        const match = await appBcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        console.error('Error compare the hash:', error);
        throw error;
    }
};
