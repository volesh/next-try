import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';

import { prisma } from '../../database';
import ctrlWrapper from '../../helpers/controller-wrapper';
import { ValidateBody } from '../../helpers/validate-body';
import { createUserSchema } from '../../schemas/create-user';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    throw new ApiError(405, 'Wrong method');
  }
  const { error } = ValidateBody(createUserSchema, req.body);
  if (error) {
    throw new ApiError(404, error.details[0].message);
  }
  const isUserExist = await prisma.user.findUnique({ where: { email: req.body.email } });
  if (isUserExist) {
    throw new ApiError(400, 'User with this email already exist');
  }
  const users = await prisma.user.create({ data: req.body });
  res.status(201).json(users);
};

export default ctrlWrapper(handler);
