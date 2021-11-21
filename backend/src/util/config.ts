import dotenv from 'dotenv';

dotenv.config();

// apival kapcsolatos információk
export const apiPort = process.env.API_PORT || 8080;
export const localUrl = `http://localhost:${apiPort}`;

export const jwtSecret = '1c28d07215544bd1b24faccad6c14a04';
export const cookieSecret = '7jsL9F90vizLBgfFOEpJope0w7pBn8FH';
