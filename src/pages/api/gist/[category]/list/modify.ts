import { NextApiRequest, NextApiResponse } from "next";
import { BOX_CATEGORY } from '../../constants';
import { client } from '../../client';
import { requireAuth } from "../../health";

export default async function(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  };
  const [,,,category] = req.url!.split('/');
  const { items } = await req.body;
  let listId;

  if (typeof category !== 'string' || !(category in BOX_CATEGORY)) {
    listId = category;
  } else {
    listId = BOX_CATEGORY[category as keyof typeof BOX_CATEGORY];
  }

  if (!Array.isArray(items)) {
    return res.status(400).json({ message: `items가 배열이 아닙니다.` });
  }

  for (const item of items) {
    for (const key in item) {
      switch (key) {
        case 'id':
        case 'body': {
          continue;
        }
        default: {
          return res.status(400).json({ message: `올바르지 않은 키(${key})가 들어왔습니다.` });
        }
      }
    }
  }

  try {
    requireAuth(req);

    const data = await client.updateItems({
      listId,
      items
    });
  
    return res.status(200).json({ data });
  } catch (error: any) {
    if (error.code != null) {
      return res.status(error.code).json({ message: error.message });
    }

    if (error.message.includes('찾을 수 없습니다.')) {
      return res.status(404).json({ message: error.message });
    }

    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}
