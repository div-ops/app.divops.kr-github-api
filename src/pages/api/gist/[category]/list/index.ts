import { NextApiRequest, NextApiResponse } from "next";
import { BOX_CATEGORY } from '../../constants';
import { client } from '../../client';
import { requireAuth } from "../../health";

const privateCategories = ['work'];
export default async function(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  };

  const [,,,category] = req.url!.split('/');
  let listId;

  if (typeof category !== 'string' || !(category in BOX_CATEGORY)) {
    listId = category;
  } else {
    listId = BOX_CATEGORY[category as keyof typeof BOX_CATEGORY];
  }

  try {
    if (privateCategories.includes(category)) {
      requireAuth(req);
    }

    const data = await client.readList({
      listId
    });
  
    return res.status(200).json({ data });
  } catch (error: any) {
    if (error.message.includes('찾을 수 없습니다.')) {
      return res.status(404).json({ message: error.message });
    }

    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}
