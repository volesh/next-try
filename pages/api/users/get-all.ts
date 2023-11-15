import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';

import { prisma } from '../../database';
import ctrlWrapper from '../../helpers/controller-wrapper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    throw new ApiError(405, 'Wrong method');
  }
  const users = await prisma.user.findMany({ include: { todos: true } });
  res.json(users);
};

export default ctrlWrapper(handler);
