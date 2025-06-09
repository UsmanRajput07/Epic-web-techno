import { NextApiRequest, NextApiResponse } from 'next';
import { authenticate } from '../../../middleware/authenticate';

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await authenticate(req, res);

  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.status(200).json({ message: 'Logged in successfully' });
}
