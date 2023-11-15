import { NextApiRequest, NextApiResponse } from 'next';

export default function ctrlWrapper(ctrl: any): any {
  const func = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await ctrl(req, res);
    } catch (e: any) {
      const { statusCode = 500, message = 'Unknown error' } = e;

      res.status(statusCode).json({ message });
    }
  };

  return func;
}
