import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { verify } from 'jsonwebtoken';
import { config } from "../config/config";
import createHttpError from 'http-errors';

export interface AuthRequest extends NextApiRequest {
  userId: string;
}

const authenticate: NextApiHandler = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const parsedToken = token.split(' ')[1];

    const decoded = verify(parsedToken, config.jwtSecret as string);

    const _req = req as AuthRequest;
    _req.userId = decoded.sub as string;
    return Promise.resolve(req);
  } catch (err) {
    return Promise.reject(createHttpError(401, 'token expire!'));
  }
};
export default authenticate;
