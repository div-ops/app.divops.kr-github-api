import { NextApiRequest, NextApiResponse } from "next";
import { BOX_CATEGORY } from './constants';

export default async function(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  };

  return res.status(200).json({ data: BOX_CATEGORY });
}
