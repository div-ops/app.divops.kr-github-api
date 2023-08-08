import { NextApiRequest, NextApiResponse } from "next";
import { BOX_CATEGORY } from '../../constants';
import { client } from '../../client';

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const [,,,category] = req.url!.split('/');

  if (typeof category !== 'string' || !(category in BOX_CATEGORY)) {
    return res.status(400).json({ error: `There is no category of ${category}` });
  }

  try {
    const data = await client.readList({
      listId: BOX_CATEGORY[category as keyof typeof BOX_CATEGORY]
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
