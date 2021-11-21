import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import userRepo from '../repo/user.repo';
import { jwtSecret } from '../util/config';

const hashSize = 32,
  saltSize = 16,
  hashAlgorithm = 'sha512',
  iterations = 1000;

type LoginBody = {
  username: string
}

// // bejelentkezés
// export const login = async (request: Request, response: Response) => {
//   const { username } = request.body as LoginBody;
//   const users = userRepo.findByUsername(username);

//   if (users.length === 0) { 
//     response.status(404).send({ message: 'This email address does not exist!' });
//   } else {
//     const expectedHash = users[0].password.substring(0, hashSize * 2);
//     const salt = Buffer.from(users[0].password.substring(hashSize * 2), 'hex');

//     // titkosítjuk a password-ot
//     crypto.pbkdf2(password, salt, iterations, hashSize, hashAlgorithm, (error, binaryHash) => {
//       if (error) {
//         response.status(400).send({ message: 'Login failed!' });
//       } else {
//         const actualHash = binaryHash.toString('hex');
//         if (expectedHash === actualHash) {
//           // jwt tokent genrálunk és visszaküldjük a kliensnek
//           const id = users[0]._id;
//           const token = jwt.sign({ email, id }, jwtSecret);
//           response.cookie('jwtToken', token, {
//             maxAge: 3600000,
//             secure: false,
//             httpOnly: true,
//             signed: true,
//             sameSite: 'strict',
//           });
//           response.status(200).send();
//         } else {
//           response.status(401).send({ message: 'Invalid email or password!' });
//         }
//       }
//     });
//   }
// }

// // ellenőrízzük, hogy a felhasználó be van-e jelentkezve - middleware
// export const authenticate = (request: Request, response: Response, next: NextFunction) => {
//   const { jwtToken } = request.signedCookies as any;

//   if (!jwtToken) {
//     response.status(401).send({ message: 'You are not logged in properly!' });
//   } else {
//     jwt.verify(jwtToken, jwtSecret, (error: Error, decoded: any) => {
//       if (error) {
//         response.status(401).send({ message: 'You are not logged in properly!' });
//       } else {
//         response.locals.userEmail = decoded.email;
//         response.locals.userId = decoded.id;
//         next();
//       }
//     });
//   }
// };

// export const getCurrentUser = (request: Request, response: Response) => {
//   response.status(200).send({ email: response.locals.userEmail, id: response.locals.userId });
// };

// export const logout = (request: Request, response: Response) => {
//   response.clearCookie('jwtToken');
//   response.status(200).send();
// };

// // regisztráció
// export const signup = async (request: Request, response: Response) => {
//   const userCreateDto = request.body as UserCreateDto;
//   let user = userMapper.createDtoToModel(userCreateDto);
//   const users = await userRepo.findByEmail(user.email);

//   if (users.length !== 0) {
//     response.status(409).send({ message: 'This email address already exists!' });
//   } else {
//     crypto.randomBytes(saltSize, (error, salt) => {
//       if (error) {
//         response.status(400).send({ message: 'Registration failed!' });
//       } else {
//         crypto.pbkdf2(user.password, salt, iterations, hashSize, hashAlgorithm, async (cryptErr, hash) => {
//           if (cryptErr) {
//             response.status(400).send({ message: 'Registration failed!' });
//           } else {
//             const hashWithSalt = Buffer.concat([hash, salt]).toString('hex');
//             user.password = hashWithSalt;
//             user = await userRepo.create(user);
//             if (!user) {
//               response.status(400).send({ message: 'Registration failed!' });
//             } else {
//               const dto = userMapper.modelToDetailsDto(user);
//               response.status(201).location(`${user._id}`).send(dto);
//             }
//           }
//         });
//       }
//     });
//   }
// }