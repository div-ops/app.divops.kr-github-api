import { NextApiRequest, NextApiResponse } from "next";
import { BOX_CATEGORY, BOX_CATEGORY_PRIVATE } from './constants';
import { requireAuth } from "./health";

export default async function(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  };

  try {
    requireAuth(req);
    return res.status(200).json({ data: BOX_CATEGORY });
  } catch {
    const categories: Record<string, string> = { ...BOX_CATEGORY };

    for (const category in categories) {
      const value = categories[category];

      if (BOX_CATEGORY_PRIVATE.includes(value)) {
        delete categories[category];
      }
    }

    return res.status(200).json({ data: categories });
  }
}
