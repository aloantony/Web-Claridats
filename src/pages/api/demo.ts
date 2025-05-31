import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ answer: 'Los huevos no suben el colesterol', score: 88 });
} 