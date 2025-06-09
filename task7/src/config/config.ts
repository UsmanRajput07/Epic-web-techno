
const _config = {
    jwtSecret: process.env.JWT_SECRET,
    env: process.env.NODE_ENV || 'development',
};

export const config = Object.freeze(_config);